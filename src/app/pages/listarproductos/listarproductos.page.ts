import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ProductosService} from '../../services/producto.service';
import {Producto} from '../../modelo/producto';

@Component({
  selector: 'app-listarproductos',
  templateUrl: './listarproductos.page.html',
  styleUrls: ['./listarproductos.page.scss'],
})
export class ListarproductosPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Productos: any;
  // @ts-ignore
  producto: Producto = new Producto();
  constructor(private router:Router, private productosService: ProductosService) { }
  ngOnInit() {
    this.Productos = this.productosService.getProductos();
    console.log(this.Productos);
  }
  editarProducto(producto: any) {
    console.log('Se procede a editar el producto');
    console.log(producto);

    let params: NavigationExtras ={
      queryParams:{
        producto:producto
      }
    };
    this.router.navigate(['update-productos'],params);
  }

  borrarProducto(producto: any) {
    console.log('Producto a Eliminar :', producto);
    this.producto=producto;
    this.producto.activo=false;
    this.productosService.save(this.producto);
    this.router.navigate(['listarproductos']);
  }
}
