import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrarTiendaPage } from './borrar-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: BorrarTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrarTiendaPageRoutingModule {}
