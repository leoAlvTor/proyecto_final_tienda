import { Component, OnInit } from '@angular/core';
import {PersonaService} from '../../services/persona.service';
import {NavigationExtras, Router} from '@angular/router';
import {Persona} from '../../modelo/persona';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Personas: any;

  persona: Persona = new Persona();

  constructor(private router: Router, private personaService: PersonaService) {
  }

  ngOnInit() {
    this.Personas = this.personaService.getPersons();
    console.log(this.Personas);
  }

  editarContacto(persona: any) {
    console.log('Se procede a editar el contacto');
    console.log(persona);

    let params: NavigationExtras ={
      queryParams:{
        persona:persona
      }
    };
    this.router.navigate(['update-cliente'],params);
  }

  borrarContacto(persona: any) {
    console.log('Cliente a Eliminar :', persona);
    this.persona=persona;
    this.persona.Activo=false;
    this.personaService.addPerson(this.persona);
    this.router.navigate(['clientes']);
  }
}
