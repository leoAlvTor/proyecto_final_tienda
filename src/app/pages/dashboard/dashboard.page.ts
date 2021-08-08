import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart,  ArcElement,  LineElement,  BarElement,  PointElement,  BarController,  BubbleController,  DoughnutController,
  LineController,  PieController,  PolarAreaController,  RadarController,  ScatterController,  CategoryScale,
  LinearScale,  LogarithmicScale,  RadialLinearScale,  TimeScale,  TimeSeriesScale,  Decimation,  Filler,  Legend,
  Title,  Tooltip} from 'chart.js';

import {DashboardService} from "../../services/dashboard.service";
import {Factura_Cabecera} from "../../modelo/factura_cabecera";
import {Producto} from "../../modelo/producto";
import {map} from "rxjs/operators";
import {ProductoService} from "../../services/producto.service";
import {FirebaseService} from "../../services/firebase.service";
import {pedido} from "../../modelo/pedido";

Chart.register(ArcElement,  LineElement,  BarElement,  PointElement,  BarController,  BubbleController,
  DoughnutController,  LineController,  PieController,  PolarAreaController,  RadarController,  ScatterController,
  CategoryScale,  LinearScale,  LogarithmicScale,  RadialLinearScale,  TimeScale,  TimeSeriesScale,  Decimation,
  Filler,  Legend,  Title,  Tooltip);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit{

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  productos: any;
  pedidos: any
  facturas_cabecera: any;

  constructor(private firebaseService: FirebaseService) {
    this.productos = new Array<Producto>();
    this.facturas_cabecera = new Array<Factura_Cabecera>();
    this.pedidos = new Array<pedido>();
  }

  async getProductos(){
     this.firebaseService.getDocuments('Producto').subscribe((data)=>{
       data.forEach(e=>{
         this.productos.push(e.payload.doc.data());
       })
       this.mapCategoriaCantidad();
     })
  }

  async getFacturas(){
    this.firebaseService.getDocuments('Factura Cabecera').subscribe((data)=>{
      data.forEach(e=>{
        this.facturas_cabecera.push(e.payload.doc.data());
      })
      this.mapDiaTotal();
    })
  }

  async getPedidos(){
    this.firebaseService.getDocuments('pedidos').subscribe((data)=>{
      data.forEach(e=>{
        this.pedidos.push(e.payload.doc.data());
      })
      this.mapEstadoPedido();
    })
  }

  async mapDiaTotal(){
    let result = [];
    this.facturas_cabecera.reduce(function (res, value) {
      if(!res[value.fecha]){
        res[value.fecha] = {fecha: value.fecha, total: 0};
        result.push(res[value.fecha])
      }
      res[value.fecha].total += value.total
      return res;
    }, {});
    let fecha = [];
    let total = [];

    for (let i = 0; i < result.length; i++) {
      fecha.push(result[i].fecha.split('T')[0])
      total.push(result[i].total)
    }
    this.lineChartMethod(fecha, total);
  }

  mapCategoriaCantidad(){
    let mapa = new Map<string, number>();

    for (let i = 0; i < this.productos.length; i++) {
      if(mapa.get(this.productos[i].categoria) !== undefined){
        let cantidad = mapa.get(this.productos[i].categoria) + 1;
        mapa.set(this.productos[i].categoria, cantidad);
      }else{
        mapa.set(this.productos[i].categoria, 1);
      }
    }
    console.log(mapa);
    let labels = Array.from(mapa.keys())
    let quantities = Array.from(mapa.values());
    this.barChartMethod(labels, quantities)
  }

  mapEstadoPedido(){
    let mapa = new Map<string, number>();
    for (let i = 0; i < this.pedidos.length; i++) {
      if(mapa.get(this.pedidos[i].estado) !== undefined){
        let cantidad = mapa.get(this.pedidos[i].estado) + 1;
        mapa.set(this.pedidos[i].estado, cantidad);
      }else{
        mapa.set(this.pedidos[i].estado, 1);
      }
    }
    let labels = Array.from(mapa.keys())
    let quantities = Array.from(mapa.values());
    this.doughnutChartMethod(labels, quantities)
  }

  async ngAfterViewInit() {
    await this.getPedidos();
    await this.getProductos();
    await this.getFacturas();
  }

  barChartMethod(labels, data) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# de Productos',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  doughnutChartMethod(label, data) {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: label,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

  lineChartMethod(label, data) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Ventas por dia',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
