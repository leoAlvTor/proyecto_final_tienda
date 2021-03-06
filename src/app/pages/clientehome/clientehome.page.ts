import { Component, OnInit } from '@angular/core';
import {categoria} from '../../modelo/categoria';
import {ProductoService} from '../../services/producto.service';
import {MenuController} from '@ionic/angular';
import {NavigationExtras, Route, Router} from '@angular/router';

@Component({
  selector: 'app-clientehome',
  templateUrl: './clientehome.page.html',
  styleUrls: ['./clientehome.page.scss'],
})
export class ClientehomePage implements OnInit {
  categorias: categoria[]=[];
  productos:any;

  constructor(private productoService: ProductoService,private menuController: MenuController,
              private router: Router) { }

  ngOnInit() {
    this.getCategories();
    console.log(this.categorias);
    this.listaproductos();
  }

  getCategories() {
    this.categorias = [
      {
        id: 1,
        nombre: 'Cafe',
        imagen: 'assets/icons/cafe.png',
        activo: true,
      },
      {
        id: 2,
        nombre: 'Bebidas',
        imagen: 'assets/icons/drinks2.png',
        activo: false,
      },
      {
        id: 3,
        nombre: 'Snacks',
        imagen: 'assets/icons/snacks.jpg',
        activo: false,
      },
      {
        id: 4,
        nombre: 'Dulces',
        imagen: 'assets/icons/dulces.png',
        activo: false,
      },
    ];
  }

  buscarbyCategoria(nombreCategoria:string){
    console.log('Nombre de la Categoria',nombreCategoria);
    this.productos=this.productoService.getproductobyCategory(nombreCategoria);
  }

  agregarProducto(producto:any){
    alert('Producto Agregado');
    console.log('Se procede a  agregar el producto',producto);
  }
  toggleMenu(){
    this.menuController.toggle('cliente');
  }
  detalleProducto(producto: any){
    console.log('El detalle del producto', producto);
    const params: NavigationExtras={
      queryParams:{
        producto:producto
      }
    };
    this.router.navigate(['detalleproducto'],params);
  }

  listaproductos(){
    this.productos=this.productoService.getProductos();
  }
}
