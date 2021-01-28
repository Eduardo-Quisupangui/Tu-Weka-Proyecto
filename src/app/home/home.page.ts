import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lista:listado[]=[
    {
      name:'admin',
      redirecTo:'/admin'
    }
  ]

  constructor() {}

}
interface listado{
  name:string;
  redirecTo:string;
}