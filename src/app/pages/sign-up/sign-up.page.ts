import { Component, OnInit } from '@angular/core';
import {Persona} from "../../modelo/persona";
import {PersonaService} from "../../services/persona.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  persona: Persona = new Persona();
  constructor(private router: Router, private personaService: PersonaService) { }

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

  loginWithFacebook() {

  }

  loginWithGoogle() {

  }
}
