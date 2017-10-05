import { Component } from '@angular/core';
import {MarkerService} from './services/marker.service';

declare var google:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MarkerService]
})
export class AppComponent {
  title:string = 'Trip Planner';
  zoom:number =5;
  lat: number = 51.678418;
  lng: number = 7.809007;
  markers:marker[];
  originalmarkers:marker[];
  markerName:string;
  markerLat:string;
  markerLng:string;
  tour:any=[];
  searchName:string="";
  drivers=[
    { name:"Doe", age:"22",img:"https://s3-media2.fl.yelpcdn.com/bphoto/W9skQfRNES1q3k-LQbZcEw/o.jpg",selected:false},
    { name:"John", age:"25",img:"https://s3-media2.fl.yelpcdn.com/bphoto/W9skQfRNES1q3k-LQbZcEw/o.jpg",selected:false},
    { name:"johnsen", age:"27",img:"https://s3-media2.fl.yelpcdn.com/bphoto/W9skQfRNES1q3k-LQbZcEw/o.jpg",selected:false},
    { name:"Mark", age:"35",img:"https://s3-media2.fl.yelpcdn.com/bphoto/W9skQfRNES1q3k-LQbZcEw/o.jpg",selected:false}
  ];

  constructor(private _markerService: MarkerService){
    this.originalmarkers=this._markerService.getMarkers();
    this.markers=this.originalmarkers;
  }

  markerClicked(marker:marker, index:number){
  }

  mapClicked($event:any){
    var newMarker={
      name:"Point"+this.markers.length,
      lat:$event.coords.lat,
      lng:$event.coords.lng,
      draggable:true
    };
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);

  }

  markerDragEnd(marker:marker,$event:any){
    var editedMarker={
      name:marker.name,
      lat:marker.lat,
      lng:marker.lng,
      draggable:true
    };
    var newLat=$event.coords.lat;
    var newLng=$event.coords.lng;
    this._markerService.updateMarker(editedMarker,newLat,newLng);
  }

  addMarker(){
    var newMarker={
      name:this.markerName,
      lat:parseFloat(this.markerLat),
      lng:parseFloat(this.markerLng),
      draggable:true
    };
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  removeMarker(marker){
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].lat==marker.lat && this.markers[i].lng==marker.lng) {
          this.markers.splice(i,1);
      }
    }
    this._markerService.removeMarker(marker);
  }

  addToTrip(marker){
    this.tour.push(marker);
  }

  removefromTrip(stop){
    for (let i = 0; i < this.tour.length; i++) {
      if (this.tour[i].lat==stop.lat && this.tour[i].lng==stop.lng) {
          this.tour.splice(i,1);
      }
    }
  }

  selectDriver(i){
    this.drivers[i].selected=true;
  }

  filterWaypoints(){
    this.markers=[];
      for (var indx in this.originalmarkers) {
        if (this.originalmarkers[indx].name.match(this.searchName)) {
             this.markers.push(this.originalmarkers[indx]);
         }
      }
    console.log(this.markers);
    console.log(this.searchName);
  }
}

interface marker{
    name?:string;
    lng:number;
    lat:number;
    draggable:boolean;
}
