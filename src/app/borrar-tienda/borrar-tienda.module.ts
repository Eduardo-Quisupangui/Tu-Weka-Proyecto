import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrarTiendaPageRoutingModule } from './borrar-tienda-routing.module';

import { BorrarTiendaPage } from './borrar-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrarTiendaPageRoutingModule
  ],
  declarations: [BorrarTiendaPage]
})
export class BorrarTiendaPageModule {}
