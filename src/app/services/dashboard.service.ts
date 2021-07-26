import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Producto} from '../modelo/producto'
import {Factura_Cabecera} from "../modelo/factura_cabecera";
import {Observable} from "rxjs";
import {first, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public firestore: AngularFirestore) { }

 //

  getFacturas(): Observable<any[]>{
    return this.firestore.collection('Factura Cabecera').valueChanges();
  }

}
