import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router, public alertController: AlertController) {}
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  async onResetPassword(email) {
    try {
      await this.authSvc.resetPassword(email.value);
      this.router.navigate(['/login']);
      const alert = await this.alertController.create({
        header: 'Correcto',
        message: 'Verifique su correo',
        buttons: ['OK']
      });

      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Ingrese un correo valido',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

}
