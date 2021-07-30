import { Component, OnInit } from '@angular/core';
import {Producto} from "../../modelo/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductosService} from "../../services/producto.service";

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  productos:any;
  // @ts-ignore
  producto: Producto = new Producto();

  constructor(private route: ActivatedRoute, private router: Router,
              private productosService: ProductosService) {
                
  }

  ngOnInit() {
  }
  add(){
    console.log(this.producto);
    this.productosService.save(this.producto);

  }

}
