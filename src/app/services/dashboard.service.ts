import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Producto} from '../modelo/producto'
import {Factura_cabecera} from "../modelo/factura_cabecera";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }
}
