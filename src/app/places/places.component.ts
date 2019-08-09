import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: google.maps.places.PlaceResult[];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces():void {
    this.placeService.getPlaces().subscribe(places => {
      this.places = places;
    })
  }

}
