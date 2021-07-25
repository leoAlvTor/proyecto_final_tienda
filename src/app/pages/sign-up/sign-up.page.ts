import { Component, OnInit } from '@angular/core';
import {Persona} from '../../modelo/persona';
import {PersonaService} from '../../services/persona.service';
import {Route, Router} from '@angular/router';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  persona: Persona = new Persona();
  constructor(private router: Router, private personaService: PersonaService,private afsAuth: AngularFireAuth) { }

  ngOnInit() {

  }
  registrarCliente(){
    this.persona.Rol='Cliente';
    this.persona.Activo=true;
    this.persona.Ubicacion='00000,000000';
    console.log(this.persona);
    alert('Se muestra la ubicacion');
    this.personaService.addPerson(this.persona);
    this.router.navigate(['login']);

  }

  async signUpWithGoogle() {
    const user = await this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    const name=user.additionalUserInfo.profile['given_name'];
    const lastn=user.additionalUserInfo.profile['family_name'];
    const messge=' Hola  '+ name +' ' + lastn;
    alert(messge);
    console.log(user);
    //Se crea el nuevo usuario y se registra
    this.persona.Activo=true;
    this.persona.Codigo=user.additionalUserInfo.profile['id'];
    this.persona.Contrasena=user.additionalUserInfo.profile['id'];
    this.persona.Correo=user.additionalUserInfo.profile['email'];
    this.persona.Nombres=user.additionalUserInfo.profile['given_name'] +' '+ user.additionalUserInfo.profile['family_name'];
    this.persona.Rol='Cliente';
    console.log(this.persona);

    this.router.navigate(['folder/Home']);
  }
  signUpWithFacebook() {

  }
}
