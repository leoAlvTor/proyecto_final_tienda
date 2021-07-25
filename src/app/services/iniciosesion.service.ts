import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciosesionService {

  constructor(public afs: AngularFirestore) { }

  login(cedula: string,contrasena: string): Observable<any>{
    console.log('this is mail of client '+cedula);
    return this.afs.collection('Persona',
      ref => ref.where('Codigo', '==', cedula).where('Contrasena','==',contrasena)).valueChanges();
  }
}
