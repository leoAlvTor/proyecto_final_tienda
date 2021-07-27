import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  lat = -2.8034043431920694;
  lng = -78.99072250530294;

  constructor() { }

  ngOnInit() {
  }

}
