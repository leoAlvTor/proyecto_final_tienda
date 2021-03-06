import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ProductoService} from '../../services/producto.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-listarproductos',
  templateUrl: './listarproductos.page.html',
  styleUrls: ['./listarproductos.page.scss'],
})
export class ListarproductosPage implements OnInit {

  constructor(private router:Router, private productosService: ProductoService,private firestore: AngularFirestore) {}

   productos: any;
   productosBackup: any;

    async ngOnInit() {
      //this.productos = this.productosService.getProductos();
      //console.log(this.productos);
      this.productos = await this.initializeItems();
      console.log(this.productos);

  }
  async initializeItems(): Promise<any>  {
    const locales =  await this.firestore.collection('Producto', ref => ref.where("activo", "==", true))
      .valueChanges().pipe(first()).toPromise();
    this.productosBackup = locales;
    return locales;
  }
  async filterList(evt) {
   this.productos = await this.initializeItems();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }
    this.productos =  this.productos.filter(producto => {
      if (producto.nombre && searchTerm) {
        return (producto.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || producto.codigo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ) ;
      }
    });
  }

  async editarProducto(producto: any) {
    console.log('Se procede a editar el producto');
    console.log(producto);

    let params: NavigationExtras ={
      queryParams:{
        producto:producto
      }
    };
    this.router.navigate(['update-productos'],params);
  }

  async borrarProducto(productos: any) {
    console.log('Producto a Eliminar :', productos);
    this.productos=productos;
    this.productosService.borrar(this.productos);
    //this.productos =  this.productosService.getProductos();
    this.productos = await this.initializeItems();
  }
}
