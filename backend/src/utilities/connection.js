const { strict } = require('assert')
const {Schema} = require('mongoose')
const Mongoose = require('mongoose')
Mongoose.Promise = global.Promise

Mongoose.set('useCreateIndex',true)

const url = 'mongodb://localhost:27017/Flight_DB'

const flightSchema = Schema({
    flightId:String,
    aircraftName:String,
    fare:Number,
    availableSeats:Number,
    status:{type:String,enum:['Running','Cancelled']}
},{collection:"Flight"})


const flightBookingSchema = Schema({
    flightId:String,
    bookingId:{type:Number,unique:true},
    passengerName:String,
    noOfTickets:Number,
    totalAmount:Number
},{collection:"FlightBooking"})

var collection = {}

collection.getFlightCollection = ()=>{
    return Mongoose.connect(url,{useNewUrlParser:true}).then(database=>{
        return database.model('Flight',flightSchema)
    }).catch(error=>{
        let err = new Error("Could not connect to the database")
        err.status = 500
        throw err
    })
}

collection.getBookingCollection = ()=>{
    return Mongoose.connect(url,{useNewUrlParser:true}).then(database=>{
        return database.model('FlightBooking',flightBookingSchema)
    }).catch(error=>{
        let err = new Error("Could not connect to the database")
        err.status = 500
        throw err
    })

}

module.exports = collection

