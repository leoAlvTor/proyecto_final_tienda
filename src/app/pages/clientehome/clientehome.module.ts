import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientehomePageRoutingModule } from './clientehome-routing.module';

import { ClientehomePage } from './clientehome.page';
import {MenuClienteModule} from '../../components/menucliente/menucliente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientehomePageRoutingModule,
    MenuClienteModule
  ],
  declarations: [ClientehomePage]
})
export class ClientehomePageModule {}
