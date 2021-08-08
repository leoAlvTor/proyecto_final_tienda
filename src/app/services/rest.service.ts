import { Injectable } from '@angular/core';
import {Producto} from '../modelo/producto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {pedido} from '../modelo/pedido';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }

  saveProducto(producto: Producto): Observable<any>{
    return this.http.post<any>(environment.WS_PATH+'productos/crear',producto);
  }
  savePedido(pedido: pedido){
    return this.http.post<any>(environment.WS_PATH+'pedidos/crear',pedido);
  }
}
