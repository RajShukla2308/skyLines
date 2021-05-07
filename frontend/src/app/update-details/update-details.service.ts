import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDetailsService {

  constructor(private http:HttpClient) { }

 updateBooking(bid:any,fId:any,nT:any):Observable<any>{
   return this.http.put<Observable<any>>("http://localhost:1050/updateBooking/"+bid,{"flightId":fId,"noOfTickets":nT})
  }
}


