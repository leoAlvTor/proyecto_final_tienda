import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingController, ModalController, NavController} from "@ionic/angular";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @ViewChild('ionSearchbar') searchBar;

  items = null;
  filtered_items = this.items;
  search_item: string = "";

  filterLoader: any;

  constructor(public loadingController: LoadingController, private modalController: ModalController, private navCtrl: NavController, private firebase: FirebaseService) {
    this.getLoadingController().then(e=>{this.filterLoader = e;});
    this.getDocuments();
  }

  ngOnInit() {

  }

  private getDocuments(){
    this.firebase.getDocuments('Persona').subscribe((data)=>{
      this.items = [];
      data.forEach((clientData: any)=>{{
        this.items.push({
          id: clientData.payload.doc.id,
          data: clientData.payload.doc.data()
        });
      }})
      this.filtered_items = this.items;
    });
  }

  private async getLoadingController(message='Cargando'){
    return await this.loadingController.create({
      message: message
    });
  }

  async setFilteredItems(message='Cargando...'){
    this.filterLoader.present();
    this.filtered_items = await this.filterItems(this.search_item);
    await this.filterLoader.dismiss();
    this.searchBar.setFocus();
  }

  async filterItems(searchItem){
    return this.items.filter(item=>{
      return item.data.Nombres.toLowerCase().indexOf(searchItem.toLowerCase()) > -1;
    });
  }

  async close(data){
    await this.modalController.dismiss(data);
  }

}
