import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../modelo/producto';
import {ProductosService} from '../../services/producto.service';

@Component({
  selector: 'app-update-productos',
  templateUrl: './update-productos.page.html',
  styleUrls: ['./update-productos.page.scss'],
})
export class UpdateProductosPage implements OnInit {
  // @ts-ignore
  producto: Producto = new Producto();

  constructor(private router: Router, private route: ActivatedRoute,
              private productosService: ProductosService) {

    route.queryParams.subscribe(params=>{
      console.log('Son los parametros de llegada',params);
      this.producto=params.producto;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.producto=this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log('Producto a editar',this.producto);
      }
    });

}
  ngOnInit(): void {
  }
  updateProducto() {
    console.log(this.producto);
    this.productosService.save(this.producto);
    this.router.navigate(['listarproductos']).then(r => console.log('Producto Modificado....'));
  }
}
