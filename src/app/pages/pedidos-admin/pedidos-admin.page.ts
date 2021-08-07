import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {pedido} from '../../modelo/pedido';
import {Producto} from '../../modelo/producto';
import {ProductoService} from "../../services/producto.service";

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.page.html',
  styleUrls: ['./pedidos-admin.page.scss'],
})
export class PedidosAdminPage implements OnInit {

  pedidos: any;
  producto: Producto;
  constructor(private firebase: FirebaseService,private productoService: ProductoService) {
  }

  ngOnInit() {
   this.pedidos=this.firebase.getPedidosTotales();
   console.log(this.pedidos);
  }

   enCamino(pedidoCliente: pedido) {
    console.log(pedidoCliente);
    pedidoCliente.estado='en camino';
    console.log(pedidoCliente);
    //this.firebase.addDocument('pedidos',JSON.parse(JSON.stringify(pedidoCliente)));
     this.firebase.update('pedidos',pedidoCliente.pid,JSON.parse(JSON.stringify(pedidoCliente)));
  }

  entregado(pedidoCliente: pedido) {
    console.log(pedidoCliente.nombre_producto);
    pedidoCliente.estado='entregado';
    console.log(pedidoCliente);
    this.firebase.getProductosByName(pedidoCliente.nombre_producto).subscribe(data=>{
      this.producto=data[0];
        this.producto.stock_unitario=(parseInt(this.producto.stock_unitario,10)-parseInt(pedidoCliente.cantidad,10)).toString();
        console.log(this.producto);
        this.firebase.update('pedidos',pedidoCliente.pid,JSON.parse(JSON.stringify(pedidoCliente)));
       // this.firebase.update('Producto',this.producto.codigo,JSON.parse(JSON.stringify(this.producto)));
    });
  }
}
