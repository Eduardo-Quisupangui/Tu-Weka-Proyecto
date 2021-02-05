import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {
  clientes: Observable<any>;
  clientes2: Observable<any>;


  constructor(private datosServicio: BaseService) { }

  slidesOptions = {
    slidesPerView: 1
  }

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
    this.clientes = this.datosServicio.getClients();
    this.clientes2 = this.datosServicio.getClients2();
  }
  usuario: usuarios[] = [
    {
      name: '',
      phone: '',
      descri:'',
      valor: ''
    }
  ]
  opcionesSelecionadas(check) {
    console.log(check.descripcion);
  }

  usuario2: usuarios2[] = [
    {
      name: '',
      phone: '',
      descri:'',
      valor: ''
    }
  ]
  opcionesSelecionadas2(check) {
    console.log(check.descripcion);
  }

}
interface listado {
  name: string;
  redirecTo: string;
}

interface usuarios {
  name: string;
  phone: string;
  descri:string;
  valor: string;

}

interface usuarios2 {
  name: string;
  phone: string;
  descri:string;
  valor: string;
}
