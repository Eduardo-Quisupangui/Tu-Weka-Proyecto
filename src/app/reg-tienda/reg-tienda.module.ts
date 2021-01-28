import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegTiendaPageRoutingModule } from './reg-tienda-routing.module';

import { RegTiendaPage } from './reg-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegTiendaPageRoutingModule
  ],
  declarations: [RegTiendaPage]
})
export class RegTiendaPageModule {}
