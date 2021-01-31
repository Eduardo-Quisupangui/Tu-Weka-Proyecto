import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from "@angular/fire/auth";//nuevo
import { AngularFireModule } from "@angular/fire";//nuevo
import { environment } from "src/environments/environment";//nuevo
import { AngularFirestoreModule } from '@angular/fire/firestore';//nuevo
//import { environment } from '../environments/environment.prod';


//componente de notificaciones

import { OneSignal } from '@ionic-native/onesignal/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),//nuevo
    AngularFireAuthModule,//nuevo
    AngularFirestoreModule,//nuevo

  ],
  providers: [
    StatusBar,
    OneSignal,
    //SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
