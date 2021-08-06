export class Factura_Detalle {
  id_factura_cabecera: string
  id_producto: string
  cantidad: number = 1;
  representacion: string
  precio_unitario: number
  precio_paquete: number
  total: number
}
