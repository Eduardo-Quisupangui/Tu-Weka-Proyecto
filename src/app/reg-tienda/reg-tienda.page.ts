import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reg-tienda',
  templateUrl: './reg-tienda.page.html',
  styleUrls: ['./reg-tienda.page.scss'],
})
export class RegTiendaPage implements OnInit {

  constructor() { }

  lista:listado[]=[
    {
      name:'admin',
      redirecTo:'/admin'
    },
    {
      name:'reg-tienda',
      redirecTo:'/reg-tienda'
    },
    {
      name:'anuncios',
      redirecTo:'/anuncios'
    },
    {
      name:'login',
      redirecTo:'/login'
    }
  ]
  ngOnInit() {
  }

}
interface listado{
  name:string;
  redirecTo:string;
}
