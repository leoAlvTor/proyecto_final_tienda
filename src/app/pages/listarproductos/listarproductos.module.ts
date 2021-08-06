import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarproductosPageRoutingModule } from './listarproductos-routing.module';

import { ListarproductosPage } from './listarproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarproductosPageRoutingModule
  ],
  declarations: [ListarproductosPage]
})
export class ListarproductosPageModule {}
