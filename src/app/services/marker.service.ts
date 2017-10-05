import {Injectable} from '@angular/core';
import {Init} from "../init-marker";

@Injectable()
export class MarkerService extends Init{
  constructor(){
    super();
    console.log("MarkerService Initialized");
    this.load();
  }
  getMarkers(){
    var markers = JSON.parse(localStorage.getItem('markers'));
    return markers;
  }

  addMarker(marker){
    var markers = JSON.parse(localStorage.getItem('markers'));
    markers.push(marker);
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(oldmarker, newLat, newLng){
    var markers = JSON.parse(localStorage.getItem('markers'));
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].lat==oldmarker.lat && markers[i].lng==oldmarker.lng) {
          markers[i].lat=newLat;
          markers[i].lng=newLng;
      }
    }
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  removeMarker(marker){
    var markers = JSON.parse(localStorage.getItem('markers'));
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].lat==marker.lat && markers[i].lng==marker.lng) {
        markers.splice(i,1);
      }
    }
    localStorage.setItem('markers', JSON.stringify(markers));
  }
}
