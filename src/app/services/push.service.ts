import { Injectable } from "@angular/core";
import { OneSignal, OSNotification } from "@ionic-native/onesignal/ngx";

@Injectable({
  providedIn: "root",
})
export class PushService {
 
  constructor(private oneSignal: OneSignal) {}

  configuracionInicial() {
    this.oneSignal.startInit(
      "50224b1f-da1e-433a-92b5-6bca3e51a375",
      "1081198778305"
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      console.log("Notificacion recibida", noti);
     
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      console.log("Notificacion abierta", noti);
    });

    this.oneSignal.endInit();
  }
}
