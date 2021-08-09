import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Persona } from 'src/app/modelo/persona';

@Component({
  selector: 'app-menucliente',
  templateUrl: './menucliente.component.html',
  styleUrls: ['./menucliente.component.scss'],
})
export class MenuclienteComponent implements OnInit {

  cliente: Persona = new Persona();

  constructor(private router: Router) { }

  ngOnInit() {

  }

  logOut() {
    localStorage.removeItem('cliente');
    this.router.navigate(['login']);
  }

  carrito() {
    this.router.navigate(['carrito']);

  }

  inicio() {
    this.router.navigate(['clientehome']);
  }

  pedidos() {
    this.router.navigate(['pedidos']);
  }
  mapa(){
    this.router.navigate(['mapa']).then(e => console.log(e,'<-- Se navego hacia mapa'));
  }

  terminos() {
    this.router.navigate(['terminos']);
  }
}
