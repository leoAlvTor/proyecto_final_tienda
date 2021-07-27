import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFirestore) { }

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

}
