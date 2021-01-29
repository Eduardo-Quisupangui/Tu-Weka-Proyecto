import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {

  constructor() { }

  slidesOptions ={
    slidesPerView:1
  }

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
