class FlightBooking{
    constructor(obj){
        this.bookingId = obj.bookingId
        this.passengerName = obj.passengerName
        this.noOfTickets = obj.noOfTickets
        this.totalAmount = obj.totalAmount
        this.flightId = obj.flightId
    }
}

module.exports = FlightBooking