import { Component, OnInit } from '@angular/core';
import {carrito} from '../../modelo/carrito';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  public productos: any=[];
  public arreglo: any=[];
  public index;

  constructor(private toastCtr: ToastController) { }

  ngOnInit() {
    this.cargarProductos();
  }
  cargarProductos(){
    this.productos = JSON.parse(localStorage.getItem('listaProductos'));
    for (let index = 0; index < this.productos.length; index++) {
    }
    console.log(this.productos);
    console.log(this.productos.length);
  }

  aumentarProducto(producto: carrito){
    console.log(producto);
    producto.cantidad=producto.cantidad+1;
  }

  disminuirProducto(producto: carrito){
    console.log(producto);
    if(producto.cantidad==1){
      this.presentToast();
      producto.cantidad=1;
    }else {
      producto.cantidad=producto.cantidad-1;
    }
  }

  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'No puede disminuir el producto',
      mode:'ios',
      duration:1000,
      position:'top'
    });
    toast.present();
  }
}
