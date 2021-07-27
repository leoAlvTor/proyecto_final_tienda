import {Component, Input, OnInit} from '@angular/core';
import {Producto} from "../../modelo/producto";
import {Factura_Detalle} from "../../modelo/factura_detalle";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss'],
})
export class ModalProductoPage implements OnInit {

  @Input() producto: Producto;

  facturaDetalle: Factura_Detalle = new Factura_Detalle();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async returnToFactura(){
    this.facturaDetalle.id_producto = this.producto.codigo

    await this.modalController.dismiss();
  }

  async exit(){
    await this.modalController.dismiss('');
  }

}
