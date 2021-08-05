import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {inicioSesion} from '../../modelo/inicioSesion';
import {IniciosesionService} from '../../services/iniciosesion.service';
import {Persona} from '../../modelo/persona';
import {ToastController} from '@ionic/angular';
import {LocationService} from '../../services/location.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inicioSesion: inicioSesion = new inicioSesion();
  persona: Persona = new Persona();

  latitudGoogle: any;
  longitudGoogle: any;
  currentLocation: any;

  constructor(private route: Router, private afsAuth: AngularFireAuth,
              private loginService: IniciosesionService,private toastCtr: ToastController,
              private locationService: LocationService ) { }

  async ngOnInit() {
    this.currentLocation = await this.locationService.getCurrentLocation(false);
    this.latitudGoogle=this.currentLocation['latitude'];
    this.longitudGoogle=this.currentLocation['longitude'];
  }
   async loginWithGoogle(){
    console.log('Logeando con GOOGLE.');
    //const user = await this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider)
    const user = await this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    //const user = await this.afsAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider)
    const name=user.additionalUserInfo.profile['given_name'];
    const lastn=user.additionalUserInfo.profile['family_name'];
    const messge=' Hola  '+ name +' ' + lastn;
    alert(messge);
     //Se crea el nuevo usuario y se registra
     this.persona.Activo=true;
     this.persona.Codigo=user.additionalUserInfo.profile['id'];
     this.persona.Contrasena=user.additionalUserInfo.profile['id'];
     this.persona.Correo=user.additionalUserInfo.profile['email'];
     this.persona.Nombres=user.additionalUserInfo.profile['given_name'] +' '+ user.additionalUserInfo.profile['family_name'];
     this.persona.Rol='Cliente';
     //Obtencion de la ubicacion
     this.persona.Ubicacion=this.latitudGoogle.toString()+','+this.longitudGoogle.toString();
     localStorage.setItem('cliente',JSON.stringify(this.persona));
     this.route.navigate(['clientehome']);
  }

  loginWithFacebook(){
    console.log('Logeando con FACEBOOK.');
  }

  async login() {
    console.log(this.inicioSesion);
    const cedula=this.inicioSesion.Cedula;
    const contrasena=this.inicioSesion.Contrasena;
    this.loginService.login(cedula,contrasena).subscribe(data=>{
      this.persona=data[0];
      try{
        if(this.persona.Codigo==cedula && this.persona.Contrasena==contrasena && this.persona.Rol=='Administrador'){
          this.route.navigate(['folder/Home']);
        }else{
          this.route.navigate(['clientehome']);
          localStorage.setItem('cliente',JSON.stringify(this.persona));
        }

      }
      catch(error){console.log('Error: ->', error);
        this.presentToast();
        this.route.navigate(['login']);}
    });
  }
  signup() {
    this.route.navigate(['sign-up']);
  }
  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'Credenciales Incorrectas.',
      mode:'ios',
      duration:2000,
      position:'top'
    });
    toast.present();
  }
}
