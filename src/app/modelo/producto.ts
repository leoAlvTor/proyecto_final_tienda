export class Producto {
  cantidad_interna: string;
  categoria: string;
  codigo: string;
  compra_paquete: string;
  compra_unitario: string;
  imagen: string;
  stock_unitario: string;
  stock_paquete: string;
  iva: string;
  nombre: string;
  proveedor: string;
  representacion: string;
  venta_paquete: string;
  venta_unidad: string;


  constructor(cantidad_interna, categoria, codigo, compra_paquete, compra_unitario,
              iva, nombre, proveedor, representacion, venta_paquete, venta_unidad) {
    this.cantidad_interna = cantidad_interna;
    this.categoria = categoria;
    this.codigo = codigo;
    this.compra_paquete = compra_paquete;
    this.compra_unitario = compra_unitario;
    this.iva = iva;
    this.nombre = nombre;
    this.proveedor = proveedor;
    this.representacion = representacion;
    this.venta_paquete = venta_paquete;
    this.venta_unidad = venta_unidad;
  }

}
