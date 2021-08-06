import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarproductosPage } from './listarproductos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarproductosPageRoutingModule {}
