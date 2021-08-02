import { Injectable } from '@angular/core';
import {carrito} from '../modelo/carrito';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productos: Array<carrito>=[];

  constructor() { }

  agregarProducto(producto: carrito){
    this.productos.push(producto);
    console.log(this.productos)
    for (let index = 0; index < this.productos.length; index++) {
      localStorage.setItem('listaProductos',JSON.stringify(this.productos));
    }
  }
  obtenerProductos(){
    return this.productos;
  }
}
