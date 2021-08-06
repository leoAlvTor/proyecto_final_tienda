import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.page.html',
  styleUrls: ['./pedidos-admin.page.scss'],
})
export class PedidosAdminPage implements OnInit {

  pedidos:any;
  constructor(private firebase:FirebaseService) { }

  ngOnInit() {
   this.pedidos=this.firebase.getPedidosTotales();
   console.log(this.pedidos);
  }

}
