import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {pedido} from '../../modelo/pedido';
import {Producto} from '../../modelo/producto';
import {ProductoService} from '../../services/producto.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {Persona} from '../../modelo/persona';
import {PersonaService} from "../../services/persona.service";

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.page.html',
  styleUrls: ['./pedidos-admin.page.scss'],
})
export class PedidosAdminPage implements OnInit {
  cliente: Persona = new Persona();

  pedidos: any;
  producto: Producto;
  constructor(private firebase: FirebaseService,private productoService: ProductoService,
              private emailComposer: EmailComposer, private personaService: PersonaService) {
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
     setTimeout(() => {
       window.location.reload();
     }, 1500);
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
    this.personaService.buscarPersona(pedidoCliente.id_cliente).subscribe(data=>{
      this.cliente=data[0];
      this.enviarEmail(this.cliente.Correo,this.cliente.Nombres,pedidoCliente.total)
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  }

  enviarEmail(correo: string,nombre: string, total: number){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        let email = {
          to: 'ismael-3310@hotmail.com',
          bcc: [],
          attachments: [],
          subject: 'Pedido Registrado',
          body: ' Hola '+ nombre +' Gracias por comprar con Tu Tienda '+ '\n'+' El total a pagar es de: ' + '$'+ total ,
          isHtml: false,
          app:"Gmail"
        };
        this.emailComposer.open(email);
        console.log(email);
      }
    });
  }
}
