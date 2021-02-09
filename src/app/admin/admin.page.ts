import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { bindCallback, Observable } from 'rxjs';
//import { DataService } from '../../services/data.service';
import { BaseService } from '../service/base.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


declare var google: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  map: any;
  markers2: any;
  res: any;
  latclick:number=-0.268901 ;
  longclick:number=-78.538880;
  inputNumer: number;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  infoWindows: any = [];
  /*
    markers: any = [
      {
        title: "National Art Gallery",
        latitude: "-17.824991",
        longitude: "31.049295"
      },
      {
        title: "West End Hospital",
        latitude: "-17.820987",
        longitude: "31.039682"
      },
      {
        title: "Dominican Convent School",
        latitude: "-17.822647",
        longitude: "31.052042"
      },
      {
        title: "Chop Chop Brazilian Steakhouse",
        latitude: "-17.819460",
        longitude: "31.053844"
      },
      {
        title: "Canadian Embassy",
        latitude: "-17.820972",
        longitude: "31.043587"
      }
    ];
  */
  //export class AdminPage implements OnInit{
  lista: listado[] = [
    {
      name: 'admin',
      redirecTo: '/admin'
    },
    {
      name: 'reg-tienda',
      redirecTo: '/reg-tienda'
    },
    {
      name: 'anuncios',
      redirecTo: '/anuncios'
    },
    {
      name: 'login',
      redirecTo: '/login'
    }
  ]
  menu: Observable<any>;
  constructor(private menu1: MenuController, private base: BaseService, private router: Router, public alertController: AlertController) {
    // this.DATOS=this.base.getDatos();
    this.base.getDatos().subscribe(dato => {
      console.log("DATO->", dato);
    });

  }

  ngOnInit(): void {

  }
  openMenu() {
    this.menu1.toggle();
  }

  ionViewDidEnter() {
    console.log("dentro-1");
    this.showMap();
  }

/////////////////////////////////////////////////////////////////////
autoCompletar(marcador,consultaGoogle)
  {
      if(marcador)
      {
          var pos=marcador.getPosition()
          //var resultado=consultaGoogle(pos.lat()+','+pos.lng(),2);
          
           this.res={
            type: "GET",
            async:false,
            url:'/frm/ajax/getDireccion.php?tipo=2&consulta='+encodeURI(pos.lat()+','+pos.lng())
          }
          var resultado=this.res;
          console.log(this.res.address_components)
          if(this.res)
          {
                console.log(this.res.address_components)
                
          }
      }
  }

 

/////////////////////////////////////////////////////////
  addMarkersToMap(markers) {
    const getcorreoif = localStorage.getItem('correo');
    for (let marker of markers) {
      if (marker.correo == getcorreoif) {
        let position = new google.maps.LatLng(marker.latitude, marker.longitude);
        let mapMarker = new google.maps.Marker({
          position: position,
          title: marker.title,
          latitude: marker.latitude,
          longitude: marker.longitude,
          idUsuario: marker.id,
          descripcion:marker.descripcion,
          precio:marker.precio
          
        });
        mapMarker.setMap(this.map);
        this.MarkerUsuario(mapMarker);
      } else {
        let position = new google.maps.LatLng(marker.latitude, marker.longitude);
        let mapMarker = new google.maps.Marker({
          position: position,
          title: marker.title,
          latitude: marker.latitude,
          longitude: marker.longitude,
          idUsuario: marker.id,
          descripcion:marker.descripcion,
          precio:marker.precio
          
        });
        
        mapMarker.setMap(this.map);
        this.addInfoWindowToMarker(mapMarker);
      }
    }
  }

  addMarkersMove() {
    console.log("dentro-4");
    let position2 = new google.maps.LatLng(-0.268901, -78.538880);
    let mapMarker2 = new google.maps.Marker({
      position: position2,
      draggable: true,
      title: "HOLA INICIO",
      latitude: 0,
      longitude: 31.049295,

    });
    mapMarker2.addListener('dragend', function (event) {
      var poss = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
      mapMarker2.setPosition(poss);
      let latitud = mapMarker2.getPosition().lat();
      console.log("lat:"+mapMarker2.getPosition().lat())
      console.log("log:"+mapMarker2.getPosition().lng())
      localStorage.removeItem('variable1');
      localStorage.setItem('variable1', '' + mapMarker2.getPosition().lat());

      localStorage.removeItem('variable2');
      localStorage.setItem('variable2', '' + mapMarker2.getPosition().lng());
    })
    mapMarker2.setMap(this.map);
    console.log("dentro-5");
    this.addInfoWindowToMarkerMove(mapMarker2);

  }



 


  /*//////////////////////////////////////////////
  */




  /*//////////////////////////////////////////////
  */
  addInfoWindowToMarkerMove(marker) {
    console.log("dentro-6");
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">Registre su tienda</h2>' +
      '<ion-button id="navigate">Registrar</ion-button>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    console.log("dentro-7");
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {

        document.getElementById('navigate').addEventListener('click', () => {
          console.log("dentro-8");
          this.router.navigate(['reg-tienda']);
          // code to navigate using google maps app
          //window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
          // console.log("latitud en boton= ",marker.getPosition().lat());
          //console.log('n=',document.getElementById('inputValue').getElementsByTagName('ion-input'));

        });

      });

    });

    this.infoWindows.push(infoWindow);
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p> ' + marker.latitude + '</p>' +
      '<p>Precio: ' + marker.longitude + '</p>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigateee').addEventListener('click', () => {
          console.log('navigate button clicked!');
          // code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  MarkerUsuario(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p>' + marker.descripcion + '</p>' +
      '<p>Precio: ' + marker.precio + '</p>' +
      '<ion-button id="editar">Editar</ion-button>' +
      '<ion-button id="borrar">Borrar</ion-button>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('editar').addEventListener('click', () => {
          console.log('navigate button clicked!');
          // code to navigate using google maps app
          //window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
          localStorage.removeItem('tituloEdit');
          localStorage.setItem('tituloEdit', marker.title);
          localStorage.removeItem('descripcionEdit');
          localStorage.setItem('descripcionEdit', marker.descripcion);
          localStorage.removeItem('precioEdit');
          localStorage.setItem('precioEdit', marker.precio);
          localStorage.removeItem('longedit');
          localStorage.setItem('longedit', marker.longitude);
          localStorage.removeItem('latedit');
          localStorage.setItem('latedit', marker.latitude);
          localStorage.removeItem('id');
          localStorage.setItem('id', marker.idUsuario);
          console.log("resgistrar")

          this.router.navigate(['editar-tienda']);
        });
         document.getElementById('borrar').addEventListener('click',async () => {
          console.log('no boradooooooooo');
          console.log('idmarker' + marker.idUsuario);
          localStorage.removeItem('idborrar');
          localStorage.setItem('idborrar', marker.idUsuario);

          if(marker.idUsuario!=""){
        
           
             const alert = await this.alertController.create({
              header: 'Correcto',
              message: 'Borrado exitoso',
              buttons: ['OK']
            });
           
            await alert.present();
            this.base.eliminarDato(marker.idUsuario);
            this.router.navigate(['anuncios']);
            
          }
          //this.base.eliminarDato(marker.idUsuario);
          
          // code to navigate using google maps app
          //window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
          // this.router.navigate(['editar-tienda']);

        });
      });

    });
    this.infoWindows.push(infoWindow);
  }


  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    console.log("dentro-2");
    const location = new google.maps.LatLng(-0.268901, -78.538880);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);


    this.base.getDatos().subscribe(da => {
      this.addMarkersToMap(da);
    });
    console.log("dentro-3");
    this.addMarkersMove();


  }

}

interface listado {
  name: string;
  redirecTo: string;
}

