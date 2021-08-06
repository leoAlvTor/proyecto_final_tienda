export class Producto {

  cantidad_interna: string;
  categoria: string;
  codigo: string;
  compra_paquete: string;
  compra_unitario: string;
  iva: string;
  nombre: string;
  proveedor: string;
  representacion: string;
  stock_paquete: string;
  stock_unitario: string;
  venta_paquete: string;
  venta_unidad: string;
  activo: boolean;
  imagen:string;



  constructor(cantidad_interna, categoria, codigo, compra_paquete, compra_unitario,
              iva, nombre, proveedor, representacion,stock_paquete,stock_unitario, venta_paquete, venta_unidad) {
    this.cantidad_interna = cantidad_interna;
    this.categoria = categoria;
    this.codigo = codigo;
    this.compra_paquete = compra_paquete;
    this.compra_unitario = compra_unitario;
    this.iva = iva;
    this.nombre = nombre;
    this.proveedor = proveedor;
    this.representacion = representacion;
    this.stock_paquete=stock_paquete;
    this.stock_unitario=stock_unitario;
    this.venta_paquete = venta_paquete;
    this.venta_unidad = venta_unidad;
  }
}
