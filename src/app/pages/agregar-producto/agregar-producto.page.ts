import { Component, OnInit } from '@angular/core';
import {Producto} from "../../modelo/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductoService} from "../../services/producto.service";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {RestService} from "../../services/rest.service";
export interface FILE{
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  electrodomestico: Producto;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  productos: any;
  //@ts-ignore
  producto: Producto = new Producto();
  constructor(private servicio: ProductoService, private angularFirestore: AngularFirestore,
              private angularFireStorage: AngularFireStorage, private rest: RestService) {
    //@ts-ignore
    this.producto = new Producto();
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
  }

  ngOnInit() {
  }

  async fileUpload(event: FileList) {

    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    const snap = await this.angularFireStorage.upload(fileStoragePath, file);
    this.getDownloadPath(snap);

  }

  async getDownloadPath(snap){
    const url = await snap.ref.getDownloadURL();
    this.producto.imagen = url;
  }


  add(){
    console.log(this.producto);
    this.servicio.save(this.producto);
    this.rest.saveProducto(this.producto).subscribe();
    setTimeout(() => {
      window.location.reload();
     }, 1500);

  }

}
