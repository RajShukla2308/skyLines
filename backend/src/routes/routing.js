const express = require('express')
const routing = express.Router()

const create = require('../model/dbsetup')
const flightBookingServ = require('../service/users')


const flightBooking = require('../model/flightbooking')
const FlightBooking = require('../model/flightbooking')

//for setting up the database
routing.get("/setupdb",(req,res,next)=>{
    create.setupdb().then(data=>{
        res.send({message:data})
    }).catch((err)=>{
        
        next(err)
    })
})

//Insert and Update
routing.post('/bookFlight',(req,res,next)=>{
    const flightBooking = new FlightBooking(req.body)
    flightBookingServ.bookFlight(flightBooking).then(bookingId=>{
        res.json({"message":"Flight Booking is Successfull with booking id: "+ bookingId})
    }).catch(err=>next(err))
})

routing.get('/getAllBookings',(req,res,next)=>{
    flightBookingServ.getAllBookings().then(bookings=>{
        res.json(bookings)
    }).catch(err=>next(err))
})

routing.get('/getFlights',(req,res,next)=>{
    flightBookingServ.getFlights().then(flights=>{
        res.json(flights)
    }).catch(err=>next(err))
})


routing.delete('/delete/:id',(req,res,next)=>{
    const id = parseInt(req.params.id)
    flightBookingServ.deleteBooking(id).then(deleteId=>{
        res.json({"message":"Successfully deleted the record, your refund will be processed soon"})
    }).catch(err=>next(err))
})

routing.put('/updateBooking/:bookingId',(req,res,next)=>{
    const bookId = req.params.bookingId
    const updateObj = req.body
    flightBookingServ.updateBooking(bookId,updateObj).then(data=>{
        res.json({"message":`Flight Booking is Successfully updated for ${bookId}. Net Payble Amount: ${data.totalAmount}`})
    }).catch(err=>next(err))
})


module.exports = routing

