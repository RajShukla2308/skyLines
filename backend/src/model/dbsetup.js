const collection = require('../utilities/connection')


const flightDb = [

{
    flightId:"IND-101",
    AircraftName:'Delta Airlines',
    fare:600,
    availableSeats:30,
    status:"Running"
},
{
    flightId:"IND-102",
    AircraftName:'JetBlue',
    fare:745,
    availableSeats:20,
    status:"Cancelled"
},
{
    flightId:"IND-103",
    AircraftName:'United Airlines',
    fare:865,
    availableSeats:40,
    status:"Cancelled"
},
{
    flightId:"IND-104",
    AircraftName:'Virgin America',
    fare:590,
    availableSeats:419,
    status:"Running"
},
{
    flightId:"IND-105",
    AircraftName:'Alligiant Air',
    fare:650,
    availableSeats:47,
    status:"Running"
},
{
    flightId:"IND-106",
    AircraftName:'Hawaiian Airlines',
    fare:800,
    availableSeats:4,
    status:"Running"
}
]

const flightBookingDb = [

    {
        "bookingId":2001,
        "passengerName":'Markel',
        "noOfTickets":10,
        "totalAmount":6000,
        "flightId":'IND-101'
    },
    {
        "bookingId":2002,
        "passengerName":'James',
        "noOfTickets":20,
        "totalAmount":12000,
        "flightId":'IND-101'
    }
]


exports.setupdb = ()=>{
    return collection.getFlightCollection().then(flight=>{
        return flight.deleteMany().then(()=>{
            return flight.insertMany(flightDb).then(()=>{
                return collection.getBookingCollection().then(booking=>{
                    return booking.deleteMany().then(()=>{
                        return booking.insertMany(flightBookingDb).then(data=>{
                            if(data){
                                return "Insertion Successfull"
                            }
                            else{
                                throw new Error("intersion failed")
                            }
                        })
                    })
                })
            })
        })
    })
}