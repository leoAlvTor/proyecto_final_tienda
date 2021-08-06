import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFacturaPageRoutingModule } from './modal-factura-routing.module';

import { ModalFacturaPage } from './modal-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFacturaPageRoutingModule
  ],
  declarations: [ModalFacturaPage]
})
export class ModalFacturaPageModule {}
