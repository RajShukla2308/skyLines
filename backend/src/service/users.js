const { runInThisContext } = require('vm')
const FlightBooking = require('../model/flightbooking')
const flightBookingDb = require('../model/users')
const db = require('../model/users')
const validator = require('../utilities/validator')


const fBookingService ={}


fBookingService.bookFlight = (flightBooking)=>{
    validator.validateFlightId(flightBooking.flightId);
    return db.checkavailability(flightBooking.flightId).then(flight=>{
        if(flight == null || flight.status =='Cancelled'){
            throw new Error("Flight unavailable or cancelled")
        }
        else if(flight.availableSeats<flightBooking.noOfTickets) {
            throw new Error("Requested number of Seats unavailable")
        }
        else{
            flightBooking.totalAmount = flightBooking.noOfTickets * flight.fare
            promise = db.bookFlight(flightBooking)
            return promise
        }
    }).then(bookingId =>  {
        return bookingId
    })
}

fBookingService.updateBooking = (bookingId, updateObj)=>{
    return db.checkavailability(updateObj.flightId).then(flight=>{
        if(flight==null || flight.status =='Cancelled'){
            throw new Error("Flight unavailable or cancelled")
        }
        else if (flight.availableSeats < updateObj.noOfTickets){
            throw new Error("Requested number of Seats unavailable")
        }
        else{
            updateObj.totalAmount = updateObj.noOfTickets *flight.fare
            return db.updateBooking(bookingId,updateObj).then(data=>{
                if(!data) throw new Error(`update for ${bookingId} is failed!`)
                else return data
            })
        }
    })
}

fBookingService.getAllBookings = ()=>{
    return db.getAllBookings().then(bookings=>{
        if(bookings == null){
            return []  
        }else return bookings
    })
}

fBookingService.getFlights = ()=>{
    return db.getFlights().then(flights=>{
       
        if(flights == null){
            return []  
        }else return flights
    })
}


fBookingService.deleteBooking = (id) =>{
    return db.deleteBooking(id).then( (id) =>{
        if(id!=null){
            let err = new Error("Booking Could not be deleted")
            err.status = 500
            throw err
        }
        else return id
    })
}

module.exports = fBookingService