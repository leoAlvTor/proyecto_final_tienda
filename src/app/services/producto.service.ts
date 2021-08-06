import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public afs: AngularFirestore) { }

  getproductobyCategory(categoria:string): Observable<any[]>{
    console.log('Esta es a categoria',categoria);
    return this.afs.collection('Producto',
      ref => ref.where('categoria','==',categoria)).valueChanges();
  }
  getProductos(): Observable<any[]>{
    return this.afs.collection('Producto').valueChanges();
  }
}
