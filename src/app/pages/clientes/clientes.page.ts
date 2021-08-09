import { Component, OnInit } from '@angular/core';
import {PersonaService} from '../../services/persona.service';
import {NavigationExtras, Router} from '@angular/router';
import {Persona} from '../../modelo/persona';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention

  //Personas: any;

  //persona: Persona = new Persona();

  //constructor(private router: Router, private personaService: PersonaService) {
  //}
  constructor(private router:Router,private personaService: PersonaService,private firestore: AngularFirestore) {
    this.Personas = Array<Persona>();
  }
  Personas:any;
  PersonasBackup:any;

  async ngOnInit() {
    //this.Personas = this.personaService.getPersons();
    //console.log(this.Personas)

    //this.Personas = await this.initializeItems();
    this.firestore.collection('Persona').snapshotChanges().subscribe((data)=>{
      data.forEach(element => {
        console.log(element.payload.doc.data())
        if((element.payload.doc.data() as Persona).Activo === true)
          this.Personas.push(element.payload.doc.data())
      });
    })
    console.log(this.Personas);
  }
  async initializeItems(): Promise<any>  {
    const locales =  await this.firestore.collection('Persona',
      ref => ref.where('Activo','==',true)).valueChanges().pipe(first()).toPromise();
    this.PersonasBackup = locales;
    return locales;
  }
  async filterList(evt) {
    this.Personas = await this.initializeItems();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }
    this.Personas =  this.Personas.filter(persona => {
      if (persona.Nombres && searchTerm) {
        return (persona.Nombres.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || persona.Codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ) ;
      }
    });
  }
  async editarContacto(persona: any) {
    console.log('Se procede a editar el contacto');
    console.log(persona);

    let params: NavigationExtras ={
      queryParams:{
        persona:persona
      }
    };
    this.router.navigate(['update-cliente'],params);
  }

  async borrarContacto(persona: any) {
    console.log('Producto a Eliminar :', persona);
    this.Personas=persona;
    this.personaService.borrar(this.Personas);
    //this.productos =  this.productosService.getProductos();
    this.Personas = await this.initializeItems();
    this.router.navigate(['clientes']);
  }
}
