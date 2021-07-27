import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LoadingController, ModalController, NavController} from "@ionic/angular";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.page.html',
  styleUrls: ['./modal-factura.page.scss'],
})
export class ModalFacturaPage implements OnInit {

  @ViewChild('ionSearchbar') searchBar;
  @Input() source: string;

  items = null;
  filtered_items = this.items;
  search_item: string = "";

  filterLoader: any;

  constructor(public loadingController: LoadingController, private modalController: ModalController, private navCtrl: NavController, private firebase: FirebaseService) {
    this.getLoadingController().then(e=>{this.filterLoader = e})
    this.getDocuments();
  }

  ngOnInit() {
  }

  private getDocuments(){
    this.firebase.getDocuments('Producto').subscribe((data)=>{
      this.items = [];
      data.forEach((productData: any)=>{
        this.items.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      });
      this.filtered_items = this.items;
    });
  }

  private async getLoadingController(message: string = 'Cargando...'){
    return await this.loadingController.create({
      message: message
    });
  }

  async setFilteredItems(event, source: string){
    this.filterLoader.present();
    if(source === 'nombre') {
      await this.filterByName();
    }else if(source === 'codigo')
      await this.filterByCode()
    await this.filterLoader.dismiss();
    this.searchBar.setFocus();
  }

  async filterByName(){
    this.filtered_items = await Promise.all(this.items.filter(item=>{
      return item.data.nombre.toLowerCase().indexOf(this.search_item.toLowerCase()) > -1;
    }));
  }

  async filterByCode(){
    this.filtered_items = await Promise.all(this.items.filter(item=>{
      return item.data.codigo.toLowerCase().indexOf(this.search_item.toLowerCase()) > -1;
    }));
  }

  async close(data){
    await this.modalController.dismiss(data);
  }

}
