import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Producto} from '../modelo/producto'
import {Factura_cabecera} from "../modelo/factura_cabecera";
import {Observable} from "rxjs";
import {first, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public firestore: AngularFirestore) { }

  async getProducts(): Promise<Producto[]>{
    let productos : Array<Producto> = new Array<Producto>();

    await this.firestore.collection('Producto').ref.get().then(
      function (snapshot) {
        snapshot.forEach(function (document) {
          productos.push(new Producto(document.get('Cantidad Interna'), document.get('Categoria'),
            document.get('Codigo'), document.get('Compra Paquete'), document.get('Compra Unitario'),
            document.get('Iva'), document.get('Nombre'), document.get('Proveedor'),
            document.get('Representacion'), document.get('Venta Paquete'), document.get('Venta Unidad')))
        })
      }
    )
    return productos;
  }

  getFacturas(): Observable<any[]>{
    return this.firestore.collection('Factura Cabecera').valueChanges();
  }

}
