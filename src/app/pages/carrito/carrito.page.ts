import { Component, OnInit } from '@angular/core';
import {carrito} from '../../modelo/carrito';
import {MenuController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {pedido} from '../../modelo/pedido';
import {Persona} from '../../modelo/persona';
import {FirebaseService} from '../../services/firebase.service';
import {CarritoService} from '../../services/carrito.service';
import {RestService} from '../../services/rest.service';
import {Factura_Cabecera} from '../../modelo/factura_cabecera';
import {Factura_Detalle} from "../../modelo/factura_detalle";


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
  public totalF=0;
  public totalIva=0;
  public subtotal=0;

  private cantidades: string;
  private precio: string;

  private total=0.0;
  private id_pedido=0;
  public totoalFC: any;
  factura_cabecera: Factura_Cabecera = new Factura_Cabecera();
  factura_detalle: Factura_Detalle = new Factura_Detalle();

  constructor(private toastCtr: ToastController,private menuController: MenuController,private router: Router,
              private fire: FirebaseService, private carritoService: CarritoService, private rest: RestService) { }

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

  eliminarProducto(producto: carrito){
    let data;
    for (let index = 0; index < this.productos.length; index++) {
      console.log(this.productos[index].nombre);
      if(this.productos[index].nombre==producto.nombre){
        data=index;
      }
    }
    console.log('Este es el indice',this.index);
    const indice=this.productos.indexOf(0);
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
    for(const pro of this.productos){
      this.cantidades=(pro.cantidad);
      this.precio=(pro.precio);
      console.log(this.cantidades);
      console.log(this.precio);

      this.total=parseFloat (this.precio)*parseFloat(this.cantidades);
      console.log('Resultado de la suma es de',this.total);
      this.total2.push(this.total);
    }
    console.log('total2------------->',this.total2);
    for(const totales of this.total2){
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
    this.fire.firebase.collection('Factura Cabecera').get().toPromise().then(snap=>{
      this.factura_cabecera.id=snap.size+1;
      this.factura_cabecera.total=this.totalF;
      console.log(this.factura_cabecera);
      this.fire.addDocument('Factura Cabecera',JSON.parse(JSON.stringify(this.factura_cabecera)));
    });


    this.fire.firebase.collection('pedidos').get().toPromise().then(snap=>{
      this.id_pedido=snap.size+1;
      console.log('nuevo id',this.id_pedido);
      console.log('total final de la factura',this.totalF);
      console.log('Factura Cabecera',this.factura_cabecera);

      for (let index = 0; index < this.productos.length; index++) {
        console.log('Id de la factura Cabecera para los productos',this.factura_cabecera.id);
        console.log('Este es el nuevo id',this.id_pedido);
        console.log(this.productos[index].nombre);
        this.pedido.numero_pedido=this.id_pedido.toString();
        this.pedido.codigo_producto=this.productos[index].id;
        this.pedido.estado='solicitado';
        this.pedido.nombre_producto=this.productos[index].nombre;
        this.pedido.id_cliente=this.cliente.Codigo;
        this.pedido.cantidad=this.productos[index].cantidad;
        this.pedido.total=this.totalF;
        //Se procede a realizar la factura

        this.factura_detalle.cantidad=parseInt(this.pedido.cantidad,10);
        this.factura_detalle.id_factura_cabecera=(this.factura_cabecera.id).toString();
        this.factura_detalle.id_producto=this.pedido.codigo_producto;
        this.factura_detalle.representacion='unidad';
        this.factura_detalle.total=this.pedido.total;
        //console.log('Nombre',this.pedido.nombre_producto,'cantidad',this.pedido.cantidad);
        //this.fire.addPedido(this.pedido);
        //Segenera el pedido
        this.fire.addDocuments('pedidos',JSON.parse(JSON.stringify(this.pedido)));
        this.rest.savePedido(this.pedido).subscribe();
        //Se realiza el dettale facturas
        this.fire.addDocuments('Factura Detalle',JSON.parse(JSON.stringify(this.factura_detalle)));

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
