import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Persona} from '../../modelo/persona';
import {PersonaService} from '../../services/persona.service';

@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.page.html',
  styleUrls: ['./update-cliente.page.scss'],
})
export class UpdateClientePage implements OnInit {

  persona: Persona = new Persona();

  constructor(private router: Router, private route: ActivatedRoute,
              private personaService: PersonaService) {

    route.queryParams.subscribe(params=>{
      console.log('Son los parametros de llegada',params);
      this.persona=params.persona;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.persona=this.router.getCurrentNavigation().extras.queryParams.persona;
        console.log('Persona a editar',this.persona);
      }
    });

  }

  ngOnInit() {
  }

  registrarCliente() {

  }

  updateContacto() {
    console.log(this.persona);
    this.personaService.addPerson(this.persona);
    setTimeout(() => {
      window.location.reload();
    }, 1580)
    this.router.navigate(['clientes']);
  }
}
