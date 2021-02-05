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
  async editarTienda(nameTienda) {
    const getcorreoif = localStorage.getItem('correo');
    const getlatitud = localStorage.getItem('latedit');
    const getlogitud = localStorage.getItem('longedit');
    const getid = localStorage.getItem('id');

    this.markers =
    {
      correo: getcorreoif,
      title: nameTienda.value,
      latitude: getlatitud,
      longitude: getlogitud,
      id: getid,

    }

    this.base.actualizarDatos(this.markers);

  }
  nombreTienda(){
    const getitulo = localStorage.getItem('tituloEdit');
    return getitulo;
  }
}
interface listado {
  name: string;
  redirecTo: string;
}
