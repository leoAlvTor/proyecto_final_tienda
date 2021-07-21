import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart,  ArcElement,  LineElement,  BarElement,  PointElement,  BarController,  BubbleController,  DoughnutController,
  LineController,  PieController,  PolarAreaController,  RadarController,  ScatterController,  CategoryScale,
  LinearScale,  LogarithmicScale,  RadialLinearScale,  TimeScale,  TimeSeriesScale,  Decimation,  Filler,  Legend,
  Title,  Tooltip} from 'chart.js';

import {DashboardService} from "../../services/dashboard.service";
import {Factura_cabecera} from "../../modelo/factura_cabecera";
import {Producto} from "../../modelo/producto";
import {map} from "rxjs/operators";

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

  productos: Promise<Producto[]>;
  facturas_cabecera: any;

  constructor(private dashboard_service: DashboardService) {
    this.productos = this.dashboard_service.getProducts();
    this.facturas_cabecera = this.dashboard_service.getFacturas();

    this.productos.then(value => {
      this.llenarDatos(value, 0);
    })
  }

  ngAfterViewInit() {
    this.barChartMethod();
    this.doughnutChartMethod();
    this.lineChartMethod();
  }

  private llenarDatos(data, source){
    if (source === 1)
      this.setProductosPorCategoria(data)
    else if(source === 2)
      this.setVentasPorDia(data)
    else if (source === 3)
      this.setVentasPorMes(data)
    else if (source === 4)
      this.setTopClientes(data)
  }

  private setProductosPorCategoria(data){
    let mapaProductosCantidad = [];

    console.log(mapaProductosCantidad.length)
    for (const dataKey in data) {
      if(!mapaProductosCantidad.includes(data[dataKey].codigo)) {
        mapaProductosCantidad.push(data[dataKey].nombre)

      }else{

      }
    }
  }

  private setVentasPorDia(data){

  }

  private setVentasPorMes(data){

  }

  private setTopClientes(data){

  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
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

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29, 15, 10, 7],
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

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
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
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }

  getProductosPorCategoria(){

  }

  getVentasEstaSemana(){

  }

  getVentasPorMes(){

  }

  getTop5Clientes(){

  }

}
