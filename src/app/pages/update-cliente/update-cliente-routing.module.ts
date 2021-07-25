import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateClientePage } from './update-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateClientePageRoutingModule {}
