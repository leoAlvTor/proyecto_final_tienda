import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProductosPageRoutingModule } from './update-productos-routing.module';

import { UpdateProductosPage } from './update-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProductosPageRoutingModule
  ],
  declarations: [UpdateProductosPage]
})
export class UpdateProductosPageModule {}
