import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Persona} from '../modelo/persona';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(public afs: AngularFirestore) { }

  addPerson(persona: Persona){
    const refPersona = this.afs.collection('Persona');
    refPersona.doc(persona.Codigo).set(Object.assign({}, persona)).then(r => console.log(''));
  }
  getPersons(): Observable<any[]>{
    return this.afs.collection('Persona',
      ref => ref.where('Activo','==',true)).valueChanges();
  }
}
