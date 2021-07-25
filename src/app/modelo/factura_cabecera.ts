export class Factura_Cabecera{
  id_documento: string
  id: number
  id_cliente: string
  fecha: Date = new Date();
  subtotal0: number
  subtotal12: number
  iva12: number
  total: number
  anulada: string = "FALSE";
}
