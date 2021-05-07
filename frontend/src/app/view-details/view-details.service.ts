import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightBooking } from '../public/FlightBooking';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ViewDetailsService {

  constructor(private http:HttpClient) { }

  view():Observable<FlightBooking[]>{
    return this.http.get<FlightBooking[]>('http://localhost:1050/getAllBookings')
  }

  delete(bookingId:any):Observable<any>{
    return this.http.delete('http://localhost:1050/delete/'+bookingId)
  }

  setup():Observable<any>{
    return <Observable<any>> this.http.get(`http://localhost:1050/setupDb`)
  }

}
