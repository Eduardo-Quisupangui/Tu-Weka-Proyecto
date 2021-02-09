import { Component, OnInit } from '@angular/core';
import { BaseService } from '../service/base.service';
@Component({
  selector: 'app-borrar-tienda',
  templateUrl: './borrar-tienda.page.html',
  styleUrls: ['./borrar-tienda.page.scss'],
})
export class BorrarTiendaPage implements OnInit {

  constructor(private base: BaseService) { }

  ngOnInit() {
    let getidborrar=localStorage.getItem('idborrar');
    this.base.eliminarDato(getidborrar);
  }

}
