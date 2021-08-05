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
  nombreCliente: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.nombreCliente=this.cliente.Nombres;
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
}
