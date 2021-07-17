import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  loginWithGoogle(){
    console.log('Logeando con GOOGLE.');
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
