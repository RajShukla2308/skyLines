import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Flights } from '../public/Flight';

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {

  url = "http://localhost:1050/bookFlight"

  url2="http://localhost:1050/getFlights"

  constructor(private http:HttpClient) { }


  bookFlight(data:any):Observable<any>{
    return this.http.post<Observable<any>>(this.url,data.value)
  }


  getFlights():Observable<Flights[]>{
    return this.http.get<Flights[]>(this.url2)
  }
}
