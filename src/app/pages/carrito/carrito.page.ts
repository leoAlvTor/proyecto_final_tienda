import { Component, OnInit } from '@angular/core';
import {carrito} from '../../modelo/carrito';
import {MenuController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {pedido} from '../../modelo/pedido';
import {Persona} from '../../modelo/persona';
import {FirebaseService} from '../../services/firebase.service';
import {CarritoService} from "../../services/carrito.service";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  pedido: pedido = new pedido();
  cliente: Persona = new Persona();

  public productos: any=[];
  public arreglo: any=[];
  public index;

  public total2: any=[];
  public totalF: number=0;
  public totalIva :number=0;
  public subtotal: number=0;

  private cantidades: string;
  private precio: string;

  private total: number=0.0;
  private id_pedido: number=0;

  constructor(private toastCtr: ToastController,private menuController: MenuController,private router: Router,
              private fire: FirebaseService, private carritoService: CarritoService) { }

  ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.cargarProductos();
    this.calcular();
  }
  cargarProductos(){
    this.productos = JSON.parse(localStorage.getItem('listaProductos'));
    for (let index = 0; index < this.productos.length; index++) {
    }
    console.log(this.productos);
    console.log(this.productos.length);
  }

  aumentarProducto(producto: carrito){
    console.log(producto);
    producto.cantidad=producto.cantidad+1;
    this.totalF=0.0;
    this.cantidades=null;
    this.precio=null;
    this.total=0.0;
    this.total2=[];
    this.subtotal=0.0;
    this.totalIva=0.0;
    this.calcular();
  }

  disminuirProducto(producto: carrito){
    console.log(producto);
    if(producto.cantidad==1){
      this.presentToast();
      producto.cantidad=1;
    }else {
      producto.cantidad=producto.cantidad-1;
    }
    this.totalF=0.0;
    this.cantidades=null;
    this.precio=null;
    this.total=0.0;
    this.total2=[];
    this.subtotal=0.0;
    this.totalIva=0.0;
    this.calcular();
  }

  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'No puede disminuir el producto',
      mode:'ios',
      duration:1000,
      position:'top'
    });
    toast.present();
  }

  eliminarProducto(producto : carrito){
    let data;
    for (let index = 0; index < this.productos.length; index++) {
      console.log(this.productos[index].nombre);
      if(this.productos[index].nombre==producto.nombre){
        data=index;
      }
    }
    console.log('Este es el indice',this.index);
    var indice=this.productos.indexOf(0);
    console.log(indice);
    this.productos.splice(data,1);
    console.log('Areglo eliminao un producto',this.productos);
    localStorage.setItem('listaProductos',JSON.stringify(this.productos));
    this.arreglo =localStorage.getItem('ListProducts');
    console.log('Seteado en un local storange',this.arreglo);
    console.log(this.productos);
    this.totalF=0.0;
    this.cantidades=null;
    this.precio=null;
    this.total=0.0;
    this.total2=[];
    this.subtotal=0.0;
    this.totalIva=0.0;
    this.calcular();

  }

  calcular(){
    console.log('recupero y calculo',this.productos);
    //Creacion de foreach
    for(let pro of this.productos){
      this.cantidades=(pro['cantidad']);
      this.precio=(pro['precio']);
      console.log(this.cantidades);
      console.log(this.precio);

      this.total=parseFloat (this.precio)*parseFloat(this.cantidades);
      console.log('Resultado de la suma es de',this.total);
      this.total2.push(this.total);
    }
    console.log('total2------------->',this.total2);
    for(let totales of this.total2){
      console.log(totales);
      this.subtotal=this.subtotal+totales;
      this.totalIva=(this.subtotal*12/100);
    }
    //this.subtotal=this.totalF;
    this.totalF=this.subtotal;
    console.log('valor a pagar con iva',this.totalIva);
    console.log('Valor total a pagar',this.totalF);
    console.log('SUBTOTAL A PAGAR:',this.subtotal);

  }

  async realizarPedido(){
    console.log(this.productos);
    this.fire.firebase.collection('pedidos').get().toPromise().then(snap=>{
      this.id_pedido=snap.size+1;
      console.log('nuevo id',this.id_pedido);
      for (let index = 0; index < this.productos.length; index++) {
        console.log('Este es el nuevo id',this.id_pedido);
        console.log(this.productos[index].nombre);
        this.pedido.numero_pedido=this.id_pedido.toString();
        this.pedido.estado='Solicitado';
        this.pedido.nombre_producto=this.productos[index].nombre;
        this.pedido.id_cliente=this.cliente.Codigo;
        this.pedido.cantidad=this.productos[index].cantidad;
        this.pedido.total=this.totalF;

        console.log('Este es el pedido',this.pedido);
        console.log('Nombre',this.pedido.nombre_producto,'cantidad',this.pedido.cantidad);
        this.fire.addDocument('pedidos',JSON.parse(JSON.stringify(this.pedido)));
      }
      this.limpiarPedidos();
      console.log('lista limpia de productos',this.productos);
    });


  }

  toggleMenu() {
    this.menuController.toggle('cliente');
  }

  backHome() {
    this.router.navigate(['clientehome']);
  }

  limpiarPedidos(){
    this.productos=[];
    this.carritoService.eliminarProductos();
    localStorage.removeItem('listaProductos');
    this.totalF=0.0;
  }
}
