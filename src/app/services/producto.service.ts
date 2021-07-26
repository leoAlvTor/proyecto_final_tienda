import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../modelo/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public afs: AngularFirestore) { }

  save(producto: Producto){
    const refProducto = this.afs.collection('Producto');

    if(producto.codigo == null){
        producto.codigo = this.afs.createId();
        producto.activo = true;
    }

    refProducto.doc(producto.codigo).set(Object.assign({}, producto));
  }

  getProductos(): Observable<any[]>{
    return this.afs.collection('Producto',
      ref => ref.where('activo', '==', true)
    ).valueChanges();
  }
}
