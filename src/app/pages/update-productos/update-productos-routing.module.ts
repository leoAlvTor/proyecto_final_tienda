import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProductosPage } from './update-productos.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProductosPageRoutingModule {}
