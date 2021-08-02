import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {carrito} from '../../modelo/carrito';
import {ToastController} from '@ionic/angular';
import {CarritoService} from '../../services/carrito.service';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.page.html',
  styleUrls: ['./detalleproducto.page.scss'],
})
export class DetalleproductoPage implements OnInit {
  producto: any;
  carrito:carrito = new carrito();

  constructor(private router: Router,  private route: ActivatedRoute, private toastCtr: ToastController,
              private carritoService: CarritoService) {
    //Get params
    route.queryParams.subscribe(params=>{
      console.log('Son los parametros de llegada',params);
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.producto=this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log('Dettale del producto :',this.producto);
      }
    });
  }

  ngOnInit() {
  }

  backHome() {
    this.router.navigate(['clientehome']);
  }
  agregarproducto(){
    console.log(this.producto);
    this.carrito.id=this.producto['codigo'];
    this.carrito.nombre=this.producto['nombre']
    this.carrito.precio=this.producto['venta_unidad']
    this.carrito.iva=this.producto['iva']
    this.carrito.imagen=this.producto['imagen']
    this.carrito.cantidad=1
    console.log('Carrito', this.carrito);
    this.carritoService.agregarProducto(this.carrito);
    this.presentToast();
  }

  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'Producto Agregado al Carrito de Compras',
      mode:'ios',
      duration:1000,
      position:'top'
    });
    toast.present();
  }
}
