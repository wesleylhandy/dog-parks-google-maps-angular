import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlaceService } from '../place.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  service: google.maps.places.PlacesService;
  geoCoder: google.maps.Geocoder;
  latLng: google.maps.LatLng;
  markers: google.maps.Marker[] = [];
  infoWindow: google.maps.InfoWindow;
  textQuery: string;
  searchType: string;
  locationQuery: string;

  constructor(private ngZone: NgZone,   
    private route: ActivatedRoute,
    private location: Location,
    private placeService: PlaceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams=> {
      this.placeService.clear();
      this.removeMarkers();
      switch (routeParams.query) {
        case "pet-stores":
          this.textQuery = "Pet Stores";
          this.searchType = "pet_store";
          break;
        case "breeders":
          this.textQuery = "Dog Breeders";
          this.searchType = "";
          break;
        case "kennels":
          this.textQuery = "Dog Kennels or Doggie Hotels";
          this.searchType = "";
          break;
        case "vets" :
          this.textQuery = "Veterinarians or Animal Hospitals";
          this.searchType = "veterinary_care";
          break;
        case "trainers":
          this.textQuery = "Dog Trainers or Obedience Schools";
          this.searchType = "";
          break;
        default:
          this.textQuery = "Dog Parks";
          this.searchType = "park";
          break;
      } 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.initMap();
        });
      } else {
        this.latLng = new google.maps.LatLng(36.7762008,-76.1899547);
        this.initMap();
      }
    })
  }

  initMap(){

    let mapOptions = {
      center: this.latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);
    this.searchPlaces();
  }

  searchPlaces() {
    const req = {
      query: this.textQuery,
      location: this.latLng,
      radius: 50000,
      fields: ['name', 'geometry', 'formatted_address']
    }
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.textSearch(req, (results, status) => {
      if (  status === google.maps.places.PlacesServiceStatus.OK ) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
      } else {
        console.error('PlacesService was not successful for the following reason: ' + status)
      }
    })
  }

  updateLocation(event) {
    event.preventDefault();
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode( { 'address': this.locationQuery }, (results, status) =>{
      if (status === google.maps.GeocoderStatus.OK) {
        this.removeMarkers();
        this.latLng = results[0].geometry.location;
        this.map.setCenter(this.latLng);
        this.searchPlaces();
      } else {
        console.error('Geocode was not successful for the following reason: ' + status)
      }
    })
  }

  createMarker(placeResult: google.maps.places.PlaceResult) {

    const marker = new google.maps.Marker({
      map: this.map,
      position: placeResult.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png'
    });

    this.markers.push(marker);

    this.placeService.add(placeResult);

    let infoWindow = new google.maps.InfoWindow({maxWidth: 200});

    google.maps.event.addListener(marker, 'click', () => {
      this.ngZone.run(() => {
          infoWindow.setContent(
          '<div style="font-weight:bold">' + 
            placeResult.name + 
          '</div>' +
          '<div>' +
          '<a href="https://www.google.com/maps/dir/?api=1&destination=' + 
            placeResult.formatted_address + 
            '&dir_action=navigate" target="_blank">' + 
            placeResult.formatted_address + 
            '</a>' +
          '</div></div>');
        infoWindow.open(this.map,marker);
      });
    });

    marker.addListener('click', toggleBounce);
    
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    this.markers.push(marker);

    let content = "<h4>You are here!</h4>";          

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
      content: content
    });

    infoWindow.open(this.map, marker);

    google.maps.event.addListener(marker, 'click', () => {
      this.ngZone.run(() => {
        infoWindow.open(this.map, marker);
      });
    });
  }

  removeMarkers(){
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    this.placeService.clear();
  }

}
