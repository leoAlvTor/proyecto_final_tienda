import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Persona} from '../../modelo/persona';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  cliente: Persona = new Persona();
  pedidos: any;
  nombre: string;
  condition:boolean;
  public pedidosArray: any=[];
  constructor(private firebas: FirebaseService,private router: Router) { }

  ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.nombre=this.cliente.Nombres;
    this.pedidos=this.firebas.getPedidos('pedidos','id_cliente',this.cliente.Codigo,'estado','Solicitado');
    if(this.pedidos===undefined){
      console.log('Tiene Pedidos');
    }else{
      console.log('No tiene pedidos');
    }
  }

  backHome() {
    this.router.navigate(['clientehome']);
  }

}

