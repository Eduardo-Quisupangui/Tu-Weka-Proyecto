import { Component, OnInit } from '@angular/core';
import { BaseService } from '../service/base.service';


@Component({
  selector: 'app-reg-tienda',
  templateUrl: './reg-tienda.page.html',
  styleUrls: ['./reg-tienda.page.scss'],
})
export class RegTiendaPage implements OnInit {

  constructor(private base: BaseService) { }
  markers: any;

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
   // const getlocalctg=localStorage.getItem('variable1');
    //console.log("listo"+getlocalctg);
  }

  async guardarTienda(nameTienda) {
    const getlocalctg=localStorage.getItem('variable1');
    const getlocalng=localStorage.getItem('variable2');
    console.log("guardado"+getlocalctg);
    console.log("guardadolng"+getlocalng);
    console.log("nombre de la tienda"+nameTienda.value);
    this.markers=
      {
        title: nameTienda.value,
        latitude: getlocalctg,
        longitude: getlocalng
      }
    
    this.base.guardarData(this.markers);
 
  }


}
interface listado{
  name:string;
  redirecTo:string;
}
