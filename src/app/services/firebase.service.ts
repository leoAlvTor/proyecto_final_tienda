import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Persona} from "../modelo/persona";
import {pedido} from "../modelo/pedido";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firebase: AngularFirestore) { }

  public addDocument(collection: string, data: any){
    return this.firebase.collection(collection).add(data);
  }

  public getDocuments(collection: string){
    return this.firebase.collection(collection).snapshotChanges();
  }

  public async getById(collection: string, docID: string){
    return await this.firebase.collection(collection).doc(docID).get().toPromise();
  }

  public async getByField(collection: string, field: string, fieldValue: string){
    return await this.firebase.collection(collection, ref => ref.where(field, '==', fieldValue)).get()
      .toPromise();
  }

  public update(collection: string, docID: string, data: any){
    return this.firebase.collection(collection).doc(docID).set(data);
  }

  public delete(collection: string, docID: string){
    return this.firebase.collection(collection).doc(docID).delete();
  }

  public getPedidos(collection: string, field: string,fieldValue: string, field2: string, fieldValue2: string): Observable<any[]>{
    return this.firebase.collection(collection,
      ref => ref.where(field,'==',fieldValue).where(field2,'==',fieldValue2)).valueChanges();
  }
  getPedidosTotales(): Observable<any[]>{
    return this.firebase.collection('pedidos').valueChanges();
  }

  getProductosByName(nombre: string): Observable<any>{
    return this.firebase.collection('Producto',
      ref => ref.where('nombre','==',nombre)).valueChanges();
  }

  addPedido(pedidos: pedido){
    const refPersona = this.firebase.collection('pedidos');
    if(pedidos.pid==null){
      pedidos.pid=this.firebase.createId();
    }
    refPersona.doc(pedidos.pid).set(Object.assign({}, pedidos)).then(r => console.log(''));
  }
  public addDocuments(collection: string, data: pedido){
    if(data.pid==null){
      data.pid=this.firebase.createId();
    }
    return this.firebase.collection(collection).doc(data.pid).set(data);
  }

}
