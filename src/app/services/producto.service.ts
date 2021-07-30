import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Producto } from '../modelo/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productosBackup: any;
  constructor(public afs: AngularFirestore) { }

  save(producto: Producto){
    const refProducto = this.afs.collection("Producto");
        let productoJSON = JSON.stringify(producto);
        producto.activo = true;
    refProducto.doc(producto.codigo).set(Object.assign({}, producto));
  }
  borrar(producto: Producto){
    const refProducto = this.afs.collection("Producto");
        let productoJSON = JSON.stringify(producto);
        producto.activo = false;
    refProducto.doc(producto.codigo).set(Object.assign({}, producto));
  }
  public read(coleccion){
    return this.afs.collection(coleccion).snapshotChanges();
  }

  public async readById(coleccion, docId){
    return await this.afs.collection(coleccion).doc(docId).get().toPromise();
  }

  public create(coleccion, datos){
    return this.afs.collection(coleccion).add(datos);
  }


  public update(coleccion, docId, datos){
    return this.afs.collection(coleccion).doc(docId).set(datos);
  }

  public delete(coleccion, docId){
    return this.afs.collection(coleccion).doc(docId).delete();
  }

  /*save(producto: Producto){
    producto.activo = true;
    let productoJSON = JSON.stringify(producto);
    return this.afs.collection('Producto').doc(producto.codigo).set(Object.assign({}, producto))
  }*/

  getProductos(): Observable<any[]>{
    return this.afs.collection('Producto',
      ref => ref.where('activo', '==', true)
    ).valueChanges().pipe(first());
  }
 
}
