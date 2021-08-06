import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Producto} from '../../modelo/producto';
import {ProductoService} from '../../services/producto.service';
export interface FILE{
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-update-productos',
  templateUrl: './update-productos.page.html',
  styleUrls: ['./update-productos.page.scss'],
})
export class UpdateProductosPage implements OnInit {
  // @ts-ignore
  producto: Producto = new Producto();
  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  electrodomestico: Producto;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  productos: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private productosService: ProductoService,private angularFirestore: AngularFirestore,
              private angularFireStorage: AngularFireStorage) {

                this.isImgUploading = false;
                this.isImgUploaded = false;
                this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
                this.files = this.ngFirestoreCollection.valueChanges();

    route.queryParams.subscribe(params=>{
      console.log('Son los parametros de llegada',params);
      this.producto=params.producto;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.producto=this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log('Producto a editar',this.producto);
      }
    });

}
  ngOnInit(): void {
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
  updateProducto() {
    console.log(this.producto);
    this.productosService.save(this.producto);
    this.router.navigate(['listarproductos']).then(r => console.log('Producto Modificado....'));
  }
}
