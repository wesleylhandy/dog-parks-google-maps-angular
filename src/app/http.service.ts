import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getParks() {
    const uri = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${environment.GOOGLE_PLACES_API_KEY}&input=dog+park&inputtype=textquery&ipbias`
    return this.http.get(uri)
  }
}
