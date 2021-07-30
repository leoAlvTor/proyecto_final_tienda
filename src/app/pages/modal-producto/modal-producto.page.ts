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

  private isPaquete: boolean = false;

  facturaDetalle: Factura_Detalle = new Factura_Detalle();

  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  checkIfValid(){
    return Number.parseFloat(this.producto.venta_paquete) === 0;
  }

  async returnToFactura(representacion: string){
    this.facturaDetalle.id_producto = this.producto.codigo;
    this.facturaDetalle.representacion = representacion;
    this.facturaDetalle.precio_unitario = Number.parseFloat(this.producto.venta_unidad);
    this.facturaDetalle.precio_paquete = Number.parseFloat(this.producto.venta_paquete);
    await this.modalController.dismiss(this.facturaDetalle);
  }

  async exit(){
    await this.modalController.dismiss('');
  }

}
