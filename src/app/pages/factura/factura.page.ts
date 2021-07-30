import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {ModalPage} from "../modal/modal.page";
import {FirebaseService} from "../../services/firebase.service";
import {Persona} from "../../modelo/persona";
import {Producto} from "../../modelo/producto";
import {ModalFacturaPage} from "../modal-factura/modal-factura.page";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import {ModalProductoPage} from "../modal-producto/modal-producto.page";
import {Factura_Detalle} from "../../modelo/factura_detalle";

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

  facturas_detalle: Array<Factura_Detalle>;

  @ViewChild('cedula') cedulaInput;

  constructor(public modalController: ModalController, private firebase: FirebaseService, private barcodeScanner: BarcodeScanner, public alertController: AlertController) {
    this.facturas_detalle = new Array<Factura_Detalle>();
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
        this.presentAlert(modalDataResponse.data.data.nombre);
        this.producto = modalDataResponse.data.data as Producto;
        this.crearFacturaDetalle(this.producto)
      }
    })
    return await modal.present();
  }

  // FACTURAS DETALLES
  async crearFacturaDetalle(data){
    await this.presentAlert(data.nombre);
    const modal = await this.modalController.create({
      component: ModalProductoPage,
      componentProps:{
        'producto': data
      }
    });
    modal.onDidDismiss().then((modalDataResponse)=>{
      if(modalDataResponse) {
        this.facturas_detalle.push(modalDataResponse as Factura_Detalle);
        this.recalcular();
      }
    });
    return await modal.present();
  }

  recalcular(){
    for (let i = 0; i < this.facturas_detalle.length; i++) {
      console.log(this.facturas_detalle[i]);
    }
  }

  startBarCodeScanner() {
    let data;
    this.barcodeScanner.scan().then(barcodeData => {
      data = barcodeData.text;
      this.presentAlert("DATA: " + data).then(r => console.log(r));
      this.firebase.getById('Producto', data).then(param=>{
        this.crearFacturaDetalle(param.data() as Producto).then(this.recalcular);
      })

    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentAlert(mensaje){
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present()
  }
}

