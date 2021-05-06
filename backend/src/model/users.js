const dbModel = require('../utilities/connection')

var flightBookingDb = {}

flightBookingDb.generateId = ()=>{
    return dbModel.getBookingCollection().then(model=>{
        return model.aggregate([{$project:{"bookingId":1,_id:0}},
        {$sort:{"bookingId":-1}},
        {$limit:1}]).then(id=>{
            let maxId = id[0].bookingId
            return maxId+1
        })
    })
}

flightBookingDb.checkavailability = (flightId)=>{
    return dbModel.getFlightCollection().then(model=>{
        return model.findOne({flightId:flightId}).then(record=>{
            if (!record || record.length==0) return null;
            else return record
        })
    })
}


flightBookingDb.bookFlight = (flightBooking)=>{
    return dbModel.getBookingCollection().then(model=>{
        return flightBookingDb.generateId().then(fid=>{
            flightBooking.bookingId = fid
            return model.create(flightBooking).then(flight=>{
                return dbModel.getFlightCollection().then(model1=>{
                    return model1.findOne({flightId:flightBooking.flightId}).then(record=>{
                        return model1.updateOne({flightId:flightBooking.flightId},{$set:{"availableSeats":record.availableSeats - flightBooking.noOfTickets}})
                    }).then(saved=>{
                        if (saved.nModified<1) throw new Error("Seats could not be modified")
                        else return fid
                    })
                })
            })
        })

    })
}


flightBookingDb.getAllBookings = ()=>{
    return dbModel.getBookingCollection().then(model=>{
        return model.find().then(bookings=>{
            if (bookings.length>0) return bookings
            else return null
        })
    })
}

flightBookingDb.getFlights = ()=>{
    return dbModel.getFlightCollection().then(model=>{
        return model.find().then(flights=>{
            if (flights.length>0) return flights
            else return null
        })
    })
}





flightBookingDb.deleteBooking = (id) => {
    return dbModel.getBookingCollection().then(model=>{
        model.deleteOne({bookingId:id}).then(deleted=>{
            if (deleted.n>0){
                return id
            }
            else return null
        })
    })
}

flightBookingDb.updateBooking = (bookingId , updateObj)=>{
    return dbModel.getBookingCollection().then(model=>{
        return model.updateOne({bookingId:bookingId},{$set:{noOfTickets:updateObj.noOfTickets, totalAmount:updateObj.totalAmount}}).then(success=>{
            if (success.nModified==1){
                return dbModel.getFlightCollection().then(flightmodel=>{
                    return flightmodel.updateOne({flightId:updateObj.flightId},{$inc:{availableSeats: -updateObj.noOfTickets}}).then(updated=>{
                        if (updated.nModified == 1) return updateObj
                        else return null
                    })
                })
            }else return null
        })
    })
}

module.exports = flightBookingDb