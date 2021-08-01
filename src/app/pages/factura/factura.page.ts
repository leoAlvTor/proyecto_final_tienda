import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {ModalPage} from "../modal/modal.page";
import {FirebaseService} from "../../services/firebase.service";
import {Persona} from "../../modelo/persona";
import {Producto} from "../../modelo/producto";
import {ModalFacturaPage} from "../modal-factura/modal-factura.page";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {ModalProductoPage} from "../modal-producto/modal-producto.page";
import {Factura_Detalle} from "../../modelo/factura_detalle";
import {Factura_Cabecera} from "../../modelo/factura_cabecera";
import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;

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

  factura_cabecera: Factura_Cabecera;

  @ViewChild('cedula') cedulaInput;

  constructor(public modalController: ModalController, private firebase: FirebaseService, private barcodeScanner: BarcodeScanner, public alertController: AlertController) {
    this.facturas_detalle = new Array<Factura_Detalle>();
    this.factura_cabecera = new Factura_Cabecera();
  }

  ngOnInit() {
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {}
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.getCliente(modalDataResponse.data);
      }
    });
    return await modal.present();
  }

  getCliente(docID: string) {
    this.firebase.getById('Persona', docID).then(
      param => {
        this.cliente = param.data() as Persona;
      }
    )
  }

  alerta(id) {
    alert('mensaje ' + id)
  }

  cleanInputs() {
    this.cliente = new Persona();
    this.cedulaInput.setFocus();
  }

  async initModal(source: string) {
    const modal = await this.modalController.create({
      component: ModalFacturaPage,
      componentProps: {
        'source': source
      }
    });
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data !== '') {
        this.producto = modalDataResponse.data.data as Producto;
        this.crearFacturaDetalle(this.producto)
      }
    })
    return await modal.present();
  }

  // FACTURAS DETALLES
  async crearFacturaDetalle(data, cantidad = 0, fuente = 'nuevo') {
    const modal = await this.modalController.create({
      component: ModalProductoPage,
      componentProps: {
        'producto': data,
        'cantidad': cantidad,
        'fuente': fuente
      }
    });
    modal.onDidDismiss().then((modalDataResponse) => {
      if(fuente === 'modificar'){
        this.facturas_detalle.splice(this.facturas_detalle.indexOf(data), 1);
        this.recalcular();
      }

      if (modalDataResponse) {
        this.facturas_detalle.push(modalDataResponse.data as Factura_Detalle);
        this.recalcular();
      }
    });
    return await modal.present();
  }

  recalcular() {
    this.factura_cabecera.iva12 = 0;
    this.factura_cabecera.subtotal0 = 0;
    this.factura_cabecera.subtotal12 = 0;
    this.factura_cabecera.total = 0;
    for (let i = 0; i < this.facturas_detalle.length; i++) {
      this.firebase.getById('Producto', this.facturas_detalle[i].id_producto).then(e => {
        this.producto = e.data() as Producto;
        if(this.producto === undefined)
          return
        if (this.producto.iva === '12') {
          this.factura_cabecera.iva12 += (this.facturas_detalle[i].total / 1.12) * 0.12;
          this.factura_cabecera.subtotal12 += this.facturas_detalle[i].total / 1.12;
        } else {
          this.factura_cabecera.subtotal0 += this.facturas_detalle[i].total;
        }
        this.factura_cabecera.iva12 = Math.round(this.factura_cabecera.iva12 * 100) / 100;
        this.factura_cabecera.subtotal0 = Math.round(this.factura_cabecera.subtotal0 * 100) / 100;
        this.factura_cabecera.subtotal12 = Math.round(this.factura_cabecera.subtotal12 * 100) / 100;
        this.factura_cabecera.total = Math.round((this.factura_cabecera.subtotal0 + this.factura_cabecera.subtotal12 + this.factura_cabecera.iva12) * 100) / 100;
      });
    }
  }

  startBarCodeScanner() {
    let data;
    this.barcodeScanner.scan().then(barcodeData => {
      data = barcodeData.text;
      this.firebase.getById('Producto', data).then(param => {
        this.crearFacturaDetalle(param.data() as Producto).then(this.recalcular);
      })

    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentGenericAlert(message){
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertRecuperarDetalle() {
    const alert = await this.alertController.create({
      message: 'Desea recuperar el ultimo detalle eliminado?',
      buttons: [
        {
          text: 'Recuperar',
          cssClass: 'secondary',
          handler: ()=>{
            this.facturas_detalle.push(this.ultimoDetalleEliminado);
            this.ultimoDetalleEliminado = null;
            this.recalcular();
          }
        },
        {text: 'CANCELAR',
        role: 'cancel',
        cssClass: 'warning'
        }
      ]
    });

    await alert.present()
  }

  ultimoDetalleEliminado: Factura_Detalle;
  async eliminarRegistro(index){
    this.ultimoDetalleEliminado = this.facturas_detalle.splice(index, 1)[0];
    this.recalcular();
  }

  async modificarRegistro(cantidad, producto){
    this.firebase.getById('Producto', producto).then(e=>{
      this.crearFacturaDetalle(e.data() as Producto, cantidad, 'modificar');
    });
  }

  async recuperarUltimoDetalle(){
    await this.presentAlertRecuperarDetalle();
  }

  async verificarDatos(){
    let persona = await this.firebase.getById('Persona', this.cliente.Codigo);
    if((persona.data() as Persona) === undefined){
      await this.presentGenericAlert("No ha seleccionado a ningun cliente.");
      this.cedulaInput.setFocus();
      return false;
    }else if(this.facturas_detalle.length === 0) {
      await this.presentGenericAlert("No ha agregado ningun producto.")
      return false;
    }else{
      return true;
    }
  }

  async crearFactura(){
    console.log('Llego 1')
    if (await this.verificarDatos()) {
      this.firebase.firebase.collection('Factura Cabecera').get().toPromise().then(snap=>{
        this.factura_cabecera.id = snap.size+1;
        this.createDetalles(this.factura_cabecera.id);
        this.firebase.update('Factura Cabecera', String(this.factura_cabecera.id), JSON.parse(JSON.stringify(this.factura_cabecera)));
        this.cliente = new Persona();
        this.facturas_detalle = [];
        this.factura_cabecera = new Factura_Cabecera();
        this.producto = null;
      })
    }
  }

  async createDetalles(cabecera_id){
    for (let i = 0; i < this.facturas_detalle.length; i++) {
      this.facturas_detalle[i].id_factura_cabecera = String(cabecera_id);
      await this.firebase.addDocument('Factura Detalle', JSON.parse(JSON.stringify(this.facturas_detalle[i])));
    }
  }

}

