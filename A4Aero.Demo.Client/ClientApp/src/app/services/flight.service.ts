import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http:HttpClient) {


   }

   getFlights():Observable<any>{
     return this.http.get('http://api.trip.xyz/common/airportslist');
   }

   
}
