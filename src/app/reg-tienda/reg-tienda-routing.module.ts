import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegTiendaPage } from './reg-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: RegTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegTiendaPageRoutingModule {}
