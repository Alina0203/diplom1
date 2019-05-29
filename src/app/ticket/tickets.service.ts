import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


import { Ticket } from './/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private heroesUrl = 'api/data';
  result:any;

  constructor(private http: Http) { }

  postData(station_name: string) {
    return this.http.post(this.heroesUrl, { station_name: station_name})
   .map(result => this.result = result.json().data)
  }
}
