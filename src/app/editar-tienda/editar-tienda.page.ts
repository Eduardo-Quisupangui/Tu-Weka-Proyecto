import { Component, OnInit } from '@angular/core';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.page.html',
  styleUrls: ['./editar-tienda.page.scss'],
})
export class EditarTiendaPage implements OnInit {

  constructor(private base: BaseService) { }
  markers: any;
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

  ngOnInit() {
  }
  async editarTienda(nameTienda,precioEdit,descripcionEdit) {
    const getcorreoif = localStorage.getItem('correo');
    let getlatitud = localStorage.getItem('latedit');
    let getlogitud = localStorage.getItem('longedit');
    const getid = localStorage.getItem('id');

    let numlat=parseFloat(getlatitud);//4
    let numlng=parseFloat(getlogitud);//5
    let minlat=numlat-0.0001;//6
    let maxlat=numlat+0.0001;//2

  ////para el rango de la longitud
    let minlong=numlng-0.0001;//6
    let maxlong=numlng+0.0001;//2

    this.markers =
    {
      correo: getcorreoif,
      id: getid,
      latitude: getlatitud,
      longitude: getlogitud,
      title: nameTienda.value,
      descripcion:descripcionEdit.value,
      precio:precioEdit.value,
      maxlat:maxlat,
      minlat:minlat,
      maxlong:maxlong,
      minlong:minlong
      

    }

 

 



    this.base.actualizarDatos(this.markers);

  }
  nombreTienda(){
    const getitulo = localStorage.getItem('tituloEdit');
    return getitulo;
  }
  descripcion(){
    const getdescripcion = localStorage.getItem('descripcionEdit');
    return getdescripcion;
  }
  precio(){
    const getprecio = localStorage.getItem('precioEdit');
    return getprecio;
  }
}
interface listado {
  name: string;
  redirecTo: string;
}
