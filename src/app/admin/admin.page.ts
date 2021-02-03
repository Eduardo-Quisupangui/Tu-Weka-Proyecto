import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
//import { DataService } from '../../services/data.service';
import { BaseService } from '../service/base.service';
import { Router } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  map: any;
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
  constructor(private menu1: MenuController, private base: BaseService,private router: Router) {
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
    this.showMap();
  }
  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }
  addMarkersMove() {
    let position2 = new google.maps.LatLng(-17.824991, 31.049295);
    let mapMarker2 = new google.maps.Marker({
      position: position2,
      draggable: true,
      title: "HOLA INICIO",
      latitude: 0,
      longitude: 31.049295
    });


    mapMarker2.addListener('dragend', function (event) {

      var poss = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
      mapMarker2.setPosition(poss);
      let latitud = mapMarker2.getPosition().lat();
      console.log(mapMarker2.getPosition().lat())
      localStorage.removeItem('variable1');
      localStorage.setItem('variable1', '' + mapMarker2.getPosition().lat());

      localStorage.removeItem('variable2');
      localStorage.setItem('variable2', '' + mapMarker2.getPosition().lng());


    })
    mapMarker2.setMap(this.map);
    this.addInfoWindowToMarkerMove(mapMarker2);

  }
  addInfoWindowToMarkerMove(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">Registre su tienda</h2>' +
      '<ion-button id="navigate">Registrar</ion-button>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
 
      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        
        document.getElementById('navigate').addEventListener('click', () => {
          console.log('navigate button clicked!');
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
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' +
      '<ion-button id="navigate">Navigate</ion-button>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          console.log('navigate button clicked!');
          // code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
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
    const location = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.base.getDatos().subscribe(da=>{
      this.addMarkersToMap(da);  
      this.addMarkersMove();
    });

  }

}

interface listado {
  name: string;
  redirecTo: string;
}

