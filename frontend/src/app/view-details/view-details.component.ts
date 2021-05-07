import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightBooking } from '../public/FlightBooking';
import { ViewDetailsService } from './view-details.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  flightDetails:FlightBooking[];
  successMessage:String;
  errorMessage:String;
  refund:number = 0;
  bkd:number = 0
  toggle:boolean = false

  constructor(private viewdetails:ViewDetailsService, private router:Router) { }

  ngOnInit(): void {
    this.view()
  }

  view(){
    this.successMessage=""
    this.errorMessage=""
    this.viewdetails.view().subscribe(data=>{
      this.flightDetails = data
    },err=>{
      this.errorMessage = err
    })
  }


  delete(bookingId:any){
    var r=confirm("Are You Sure Want to Delete Booking? Your refund will be processed soon.")
    if (r==true){
    this.viewdetails.delete(bookingId).subscribe(data=>{
      this.view()
      this.successMessage = ""
    },err=>{
      this.errorMessage = err
    })
  }
  }

  showRefund(val:any,bid:any){
    this.refund = 0
    this.bkd = bid
    this.refund =val*0.8
    this.toggle = !this.toggle
  }

  updateBooking(bid:any,fid:any){
    this.router.navigate(["/update",bid,fid])
  }

}
