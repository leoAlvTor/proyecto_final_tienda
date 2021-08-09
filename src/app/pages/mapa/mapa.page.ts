import { NumberFormatStyle } from '@angular/common';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  zoom = 14;
  //lat=37.427455;
  //lng=-122.1385221;

   lat = -2.8972198003892378;
   lng = -78.99188644259048;
   latitudGoogle: any;
   longitudGoogle: any;
   currentLocation: any;
   origin: any;
   destination: any;
   constructor(private callNumber: CallNumber,private router:Router, private locationService: LocationService){

   }

  async ngOnInit() {
    this.getDirection();
  }
  icons = {
    client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png",
    shop: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",
    center: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Chartreuse.png",
    pointer: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Azure.png",
    moto:"data:image/png;base64,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",
  };
  async getDirection() {
    this.currentLocation = await this.locationService.getCurrentLocation(false);
     this.latitudGoogle=this.currentLocation['latitude'].toString();
     this.longitudGoogle=this.currentLocation['longitude'].toString();
    //const coordinates = await Geolocation.getCurrentPosition();
    //console.log('Current position:', coordinates.coords.latitude);
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: Number(this.latitudGoogle) , lng: Number(this.longitudGoogle)};
    //this.destination = { lat:-2.9055482 , lng:-78.9905908};
    alert(this.destination.lat);
    alert(this.destination.lng);

  }
  llamarMoto(){
    this.callNumber.callNumber('0984965930', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }
  llamarEncargado(){
      this.callNumber.callNumber('0987654321', true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
      }


      backHome(){
        this.router.navigate(['clientehome'])
      }
}
