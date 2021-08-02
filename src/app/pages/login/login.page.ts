import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {inicioSesion} from '../../modelo/inicioSesion';
import {IniciosesionService} from '../../services/iniciosesion.service';
import {Persona} from '../../modelo/persona';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inicioSesion: inicioSesion = new inicioSesion();
  persona: Persona = new Persona();

  constructor(private route: Router, private afsAuth: AngularFireAuth,
              private loginService: IniciosesionService,private toastCtr: ToastController ) { }

  ngOnInit() {
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
