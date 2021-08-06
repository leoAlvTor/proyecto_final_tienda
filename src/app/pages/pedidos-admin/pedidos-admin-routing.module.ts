import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAdminPage } from './pedidos-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAdminPageRoutingModule {}
