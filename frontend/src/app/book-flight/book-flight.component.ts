import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators , FormControl,FormGroup} from '@angular/forms'
import { BookFlightService } from './book-flight.service';
import { Flights } from '../public/Flight';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  errorMessage:String;
  successMessage:String;
  flights:Flights[]
  fid:string;
  

  constructor(private fb:FormBuilder , private bookFlightService:BookFlightService) { 
    this.bookFlightService.getFlights().subscribe(flights=>{
      this.flights = flights
      for(var i=0; i<this.flights.length; i++){
        this.flights[i]=this.flights[i].flightId
      } 
    })
  }

  bookingForm:FormGroup;

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      passengerName:['',{updateOn:'blur',validators:[Validators.required,Validators.pattern("^([A-z]+[ ]*[A-z]*)+$")]}],
      noOfTickets:['',[Validators.required,Validators.min(1)]],
      flightId:['',Validators.required]
    })
  }

  book(){
    this.successMessage = ""
    this.errorMessage=""
    this.bookFlightService.bookFlight(this.bookingForm).subscribe(data=>{
      this.successMessage = data.message
    },(err)=>{
      this.errorMessage = err.error.message
    }
    )} 

}

function validateFlight(c:FormControl){
  let regex= /^IND-[0-9]{3}$/
  if (!(regex.test(c.value))){return true}
  else{
    return null
  }
}