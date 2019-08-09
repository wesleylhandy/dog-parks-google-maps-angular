import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  placesList: google.maps.places.PlaceResult[] = [];

  add(place: google.maps.places.PlaceResult) {
    this.placesList.push(place)
  }

  clear() {
    this.placesList = [];
  }

  getPlaces(): Observable<google.maps.places.PlaceResult[]> {
    return of(this.placesList)
  }

  constructor() { }
}
