export class Factura_Cabecera{
  id_documento: string
  id: number
  id_cliente: string
  fecha: Date = new Date();
  subtotal0: number = 0;
  subtotal12: number = 0;
  iva12: number = 0;
  total: number = 0;
  anulada: string = "FALSE";
}
