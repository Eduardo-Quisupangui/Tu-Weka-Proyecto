import { Component, OnInit } from '@angular/core';
import { BaseService } from '../service/base.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reg-tienda',
  templateUrl: './reg-tienda.page.html',
  styleUrls: ['./reg-tienda.page.scss'],
})
export class RegTiendaPage implements OnInit {

  constructor(private base: BaseService, public alertController: AlertController, private router: Router) { }
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

  }

  async guardarTienda(nameTienda,precio,descripcion) {
    let getlocalctg=localStorage.getItem('variable1');
    let getlocalng=localStorage.getItem('variable2');
    const getcorreobase=localStorage.getItem('correo');
    // console.log("guardado"+getlocalctg);
    // console.log("guardadolng"+getlocalng);
    // console.log("correobase"+getcorreobase);
    // console.log("nombre de la tienda"+nameTienda.value);
    console.log("descripcion.value:"+descripcion.value);
    console.log("precio.value"+precio.value);
    let numlat=parseFloat(getlocalctg);//4
    let numlng=parseFloat(getlocalng);//5
  ////para el rango de la latitud
    let minlat=numlat-0.0001;//6
    let maxlat=numlat+0.0001;//2

  ////para el rango de la longitud
    let minlong=numlng-0.0001;//6
    let maxlong=numlng+0.0001;//2

    this.markers=
      {
        correo: getcorreobase,
        title: nameTienda.value,
        latitude: getlocalctg,
        longitude: getlocalng,
        descripcion:descripcion.value,
        precio:precio.value,
        maxlat:maxlat,
        minlat:minlat,
        maxlong:maxlong,
        minlong:minlong

      }
      
      
      if(nameTienda.value!="" && descripcion.value!="" && precio.value!=""){
        console.log("nombre:"+nameTienda.value)
        const alert = await this.alertController.create({
          header: 'Correcto',
          message: 'El registro es correcto',
          buttons: ['OK']
        });
        await alert.present();
        this.base.guardarData(this.markers)
        this.router.navigate(['admin']);

      }else{
        const alert = await this.alertController.create({
          header: 'ERROR',
          message: 'Verifique campos de registro',
          buttons: ['OK']
        });
  
        await alert.present();
      }
      

        
    // this.base.getDatos().subscribe(da => {
    //   this.maxmin(da,numlat,maxlat,minlat,numlng,maxlong,minlong);
    // });
  //  if (this.maxmin==0){
  //    console.log("guadadooooooooooooo")
  //   this.base.guardarData(this.markers);
  //  }else{
  //   console.log("no guadado")
  //  }
    
  }

  // maxmin (markers,numlat,maxlat,minlat,numlng,maxlong,minlong) {
  //   var cont=0;
  //   for (let marker of markers) {
  //     //console.log("id:"+marker.id);
  //     if(marker.maxlat!=undefined){
  //     if ( (numlat>marker.maxlat || numlat<marker.minlat) || (numlng>marker.maxlong || numlat<marker.minlong) ){
  //     // localStorage.removeItem('maximo');
  //     // localStorage.setItem('maximo', '' + marker.max.getPosition().lat());

  //     // localStorage.removeItem('minimo');
  //     // localStorage.setItem('minimo', '' + marker.min.getPosition().lng());
  //     console.log("Registro de tienda")

      

  //     }else{
  //       cont=1;
    
  //     }
  //   }
  //   }

  //   if(cont==0){
  //     console.log("")
  //     //this.base.guardarData(this.markers)
  //   }else{
  //     console.log("")
      
  //   }
  // }


}
interface listado{
  name:string;
  redirecTo:string;
}
