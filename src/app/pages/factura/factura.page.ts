import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalPage} from "../modal/modal.page";
import {FirebaseService} from "../../services/firebase.service";
import {Persona} from "../../modelo/persona";
import {Producto} from "../../modelo/producto";
import {ModalFacturaPage} from "../modal-factura/modal-factura.page";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import {ModalProductoPage} from "../modal-producto/modal-producto.page";

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  cliente: Persona = new Persona();
  modalResponse: any;

  data: any;
  producto: Producto;

  @ViewChild('cedula') cedulaInput;

  constructor(public modalController: ModalController, private firebase: FirebaseService, private barcodeScanner: BarcodeScanner) {
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
      if(modalDataResponse.data !== '') {
        this.crearFacturaDetalle(modalDataResponse.data.data)
      }
    })
    return await modal.present();
  }

  async crearFacturaDetalle(data){
    this.producto = data as Producto;
    const modal = await this.modalController.create({
      component: ModalProductoPage,
      componentProps:{
        'producto': data
      }
    });
    modal.onDidDismiss().then((modalDataResponse)=>{
      if(modalDataResponse)
        console.log(modalDataResponse);
    });
    return await modal.present();
  }

  startBarCodeScanner() {
    let data;
    this.barcodeScanner.scan().then(barcodeData => {
      data = barcodeData;
      this.firebase.getByField('Producto', 'codigo', data).then(e=>{
        e.subscribe(async productos => {
          this.producto = productos[0] as Producto;
          await this.crearFacturaDetalle(this.producto);
        })
      })
    }).catch(err => {
      console.log('Error', err);
    });
  }
}

