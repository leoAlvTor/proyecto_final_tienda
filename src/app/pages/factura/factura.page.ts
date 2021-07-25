import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalPage} from "../modal/modal.page";
import {FirebaseService} from "../../services/firebase.service";
import {Persona} from "../../modelo/persona";

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  cliente: Persona = new Persona();
  modalResponse: any;

  @ViewChild('cedula') cedulaInput;

  constructor(public modalController: ModalController, private firebase: FirebaseService) { }

  ngOnInit() {
  }

  async createModal(){
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps:{}
    });

    modal.onDidDismiss().then((modalDataResponse)=>{
      if(modalDataResponse !== null){
        this.getCliente(modalDataResponse.data);
      }
    });
    return await modal.present();
  }

  getCliente(docID: string){
      this.firebase.getById('Persona', docID).then(
        param => {
          this.cliente = param.data() as Persona;
        }
      )
  }

  cleanInputs(){
    this.cliente = new Persona();
    this.cedulaInput.setFocus();
  }

}

