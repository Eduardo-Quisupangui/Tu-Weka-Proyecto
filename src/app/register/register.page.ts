import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router, public alertController: AlertController) {}

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        const alert = await this.alertController.create({
          header: 'Correcto',
          message: 'Su registro fue un exito',
          buttons: ['OK']
        });
  
        await alert.present();
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

}
