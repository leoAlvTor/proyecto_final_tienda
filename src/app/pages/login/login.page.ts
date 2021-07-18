import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route: Router, private afsAuth: AngularFireAuth) { }

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
    this.route.navigate(['folder/Home']);
  }
  loginWithFacebook(){
    console.log('Logeando con FACEBOOK.');
  }
  login() {
    this.route.navigate(['folder/Home']);
  }
  signup() {
    this.route.navigate(['sign-up']);
  }
}
