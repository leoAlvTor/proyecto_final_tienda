import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFacturaPage } from './modal-factura.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFacturaPageRoutingModule {}
