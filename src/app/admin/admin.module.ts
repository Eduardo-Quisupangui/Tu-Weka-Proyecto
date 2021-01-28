import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { RouterModule } from '@angular/router';
//import { AdminRoutingModule } from './admin-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminPage
      }
    ])
   
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}

/*
 
*/