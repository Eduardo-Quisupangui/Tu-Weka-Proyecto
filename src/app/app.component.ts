import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';


//servicio llamado
import { PushService } from './services/push.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  lista: listado[]=[
    {
      name:'Mapa',
      redirecTo:'/admin',
      icon:'beer-outline'
    },
    {
      name:'Anuncios',
      redirecTo: '/anuncios',
      icon:'boat-outline'
    },
    {
      name:'Salir',
      redirecTo:'/login',
      icon:'bug-outline'
    }
  ]
  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router,//nueno splash

      //Inyecto mi servicio el component
      private pushService: PushService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.router.navigateByUrl('splash');//nuevo splash

       //metodo pushh
       this.pushService.configuracionInicial();
       this.checkDarkTheme();
    });
  }
  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if ( prefersDark.matches ) {
      document.body.classList.toggle( 'dark' );
    }
  }
  darkMode: boolean = true;
  cambio() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark' );
    
  }

  correo() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const getcorreo=localStorage.getItem('correo');
    return getcorreo;
    //this.darkMode = !this.darkMode;
    //document.body.classList.toggle( 'dark' );
    
  }
}
interface listado{
  name:string;
  redirecTo:string;
  icon:string;
}
