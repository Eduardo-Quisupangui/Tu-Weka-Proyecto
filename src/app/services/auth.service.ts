import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
//
export class AuthService {


  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, public alertController: AlertController) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const alert1 = await this.alertController.create({
        header: 'Correcto',
        message: 'Su registro es valido',
        buttons: ['OK']
      });
      await alert1.present();
      // await this.sendVerifcationEmail();
      return user;
    } catch (error) {

      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Verifique campos vacio o ya existe este correo',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Verifique correo y contraseña',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
  //envio de email - revisar en el correo
  /*
    async sendVerifcationEmail(): Promise<void> {
      try {
        return (await this.afAuth.currentUser).sendEmailVerification();
      } catch (error) {
        console.log('Error->', error);
      }
    }
   */

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : true;//combio ultima false
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }


}
