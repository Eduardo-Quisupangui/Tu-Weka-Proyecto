import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
     
      if (user) {
        localStorage.removeItem('correo');
        localStorage.setItem('correo', email.value);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }

    } catch (error) {
      console.log('Error->', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      
      if (user) {
        localStorage.removeItem('correo');
        localStorage.setItem('correo', user.email);
        console.log(user.email);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }

    } catch (error) {
      console.log('Error->', error);
    }
  }
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }


}
