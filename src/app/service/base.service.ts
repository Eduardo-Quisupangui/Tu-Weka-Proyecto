import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private base:AngularFireDatabase,private http: HttpClient) { }

  public getDatos(){
    return this.base.list('tiendas').valueChanges();
  }

  public guardarData(dato){
    let key=this.base.list('/tiendas/').push(dato).key;
    dato.id = key;
    this.base.database.ref('tiendas/' + dato.id).set(dato);
  }

  public actualizarDatos(dato) {
    //Actualizamos la fruta con el id que recibimos del objeto del parametro
    this.base.database.ref('tiendas/' + dato.id).set(dato);
  }

  public eliminarDato(id) {
    console.log("eliminar ingreso"+id);
    this.base.database.ref('tiendas/' + id).remove();
    //Borrará la fruta con el id que le pasamos por parametro
  }

  public getClients() {
    return this.http.get('https://raw.githubusercontent.com/Eduardo-Quisupangui/base-anuncios-principales/main/baseAnuncios1.json');
  }

  public getClients2() {
    return this.http.get('https://raw.githubusercontent.com/Eduardo-Quisupangui/base-anuncios-principales/main/baseAnuncios2.json');
  }

  
}
