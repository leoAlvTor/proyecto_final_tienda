import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateClientePageRoutingModule } from './update-cliente-routing.module';

import { UpdateClientePage } from './update-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateClientePageRoutingModule
  ],
  declarations: [UpdateClientePage]
})
export class UpdateClientePageModule {}
