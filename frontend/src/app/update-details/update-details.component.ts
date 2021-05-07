import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDetailsService } from './update-details.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  errorMessage:String;
  successMessage:String;
  bookingId:any;
  flightId:any;

  updateForm:FormGroup;
  constructor(private fb:FormBuilder, private actRoute:ActivatedRoute, private updateService:UpdateDetailsService) {
    this.actRoute.params.subscribe(data=>{
      this.bookingId = data.bookingId
      this.flightId = data.flightId
    })
   }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      bookingId:[this.bookingId],
      noOfTickets:[' ',[Validators.required,Validators.min(1)]],
      flightId:[this.flightId]
    },)
    
  }

  updateBooking(){
    this.successMessage=""
    this.errorMessage=""
    this.updateService.updateBooking(this.bookingId,this.flightId,this.updateForm.value.noOfTickets).subscribe(data=>{
      this.successMessage = data.message
    },err=>{
      this.errorMessage = err.error.message
    })
  }

}
