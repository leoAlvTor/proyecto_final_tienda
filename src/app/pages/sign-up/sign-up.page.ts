import { Component, OnInit } from '@angular/core';
import {Persona} from '../../modelo/persona';
import {PersonaService} from '../../services/persona.service';
import {Route, Router} from '@angular/router';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {LocationService} from '../../services/location.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  persona: Persona = new Persona();
  latitudGoogle: any;
  longitudGoogle: any;
  currentLocation: any;

  constructor(private router: Router, private personaService: PersonaService,private afsAuth: AngularFireAuth,
              private locationService: LocationService) { }

   async ngOnInit() {
    this.currentLocation = await this.locationService.getCurrentLocation(false);
     this.latitudGoogle=this.currentLocation['latitude'];
     this.longitudGoogle=this.currentLocation['longitude'];
  }
  registrarCliente(){
    this.persona.Rol='Cliente';
    this.persona.Activo=true;
    this.persona.Ubicacion=this.latitudGoogle.toString()+','+this.longitudGoogle.toString();
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
    //Obtencion de la ubicacion
    this.persona.Ubicacion=this.latitudGoogle.toString()+','+this.longitudGoogle.toString();
    //Se almacena el usuario inicado con google
    this.personaService.addPerson(this.persona);
    localStorage.setItem('cliente',JSON.stringify(this.persona));

    this.router.navigate(['clientehome']);
  }
  signUpWithFacebook() {

  }
}
