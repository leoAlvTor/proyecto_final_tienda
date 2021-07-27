import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalPage} from "../modal/modal.page";
import {FirebaseService} from "../../services/firebase.service";
import {Persona} from "../../modelo/persona";
import {Producto} from "../../modelo/producto";
import {ModalFacturaPage} from "../modal-factura/modal-factura.page";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  cliente: Persona = new Persona();
  modalResponse: any;

  // Data for product list.
  productos: any;

  @ViewChild('cedula') cedulaInput;

  constructor(public modalController: ModalController, private firebase: FirebaseService) {
    this.getProductos();
  }

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

  getProductos(){
    this.firebase.getDocuments('Producto').subscribe((data)=>{
      this.productos = [];
      data.forEach((producto: any)=>{
        this.productos.push({
          id: producto.payload.doc.id,
          data: producto.payload.doc.data()
        });
      });
    });
  }

  alerta(id){
    alert('mensaje '+id)
  }

  cleanInputs(){
    this.cliente = new Persona();
    this.cedulaInput.setFocus();
  }

  async initModal(source:string){
    const modal = await this.modalController.create({
      component: ModalFacturaPage,
      componentProps: {
        'source': source
      }
    });
    modal.onDidDismiss().then((modalDataResponse)=>{
      if(modalDataResponse.data !== '')
        this.setProducto(modalDataResponse.data)
    })
    return await modal.present();
  }

  setProducto(data){
    console.log(data.data)
  }


  async startBarCodeScanner(){

  }


}

