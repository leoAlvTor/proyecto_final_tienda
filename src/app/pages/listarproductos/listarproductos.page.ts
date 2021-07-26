import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductosService} from '../../services/producto.service';

@Component({
  selector: 'app-listarproductos',
  templateUrl: './listarproductos.page.html',
  styleUrls: ['./listarproductos.page.scss'],
})
export class ListarproductosPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Productos: any;

  constructor(private router:Router, private productosService: ProductosService) { }
  ngOnInit() {

    this.Productos = this.productosService.getProductos();
    console.log(this.Productos);
  }

}
