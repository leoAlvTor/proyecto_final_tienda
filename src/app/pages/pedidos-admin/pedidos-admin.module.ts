import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAdminPageRoutingModule } from './pedidos-admin-routing.module';

import { PedidosAdminPage } from './pedidos-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAdminPageRoutingModule
  ],
  declarations: [PedidosAdminPage]
})
export class PedidosAdminPageModule {}
