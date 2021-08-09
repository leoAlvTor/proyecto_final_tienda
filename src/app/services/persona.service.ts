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
  borrar(persona: Persona){
    const refProducto = this.afs.collection("Persona");
        let productoJSON = JSON.stringify(persona);
        persona.Activo = false;
    refProducto.doc(persona.Codigo).set(Object.assign({}, persona));
  }
}
