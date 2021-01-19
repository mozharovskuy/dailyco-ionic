import {Component, ViewChild} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import DailyIframe from '@daily-co/daily-js';
import {Camera} from '@capacitor/camera';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild('videoFrame') videoFrame;

  public meetLink = 'https://api-demo.daily.co/';

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public async joinCall(): Promise<void> {
    try {
      const cameraPermissions = await Camera.checkPermissions();

      console.log('Permissions: ' + cameraPermissions);
    } catch (e) {
      console.error(e);
    }

    const call = await DailyIframe
        .wrap(this.videoFrame.nativeElement)
        .join({
          url: this.meetLink,
          dailyConfig: {
            experimentalGetUserMediaConstraintsModify: (constraints => {
              constraints.audio = true;
              constraints.video = true;
            })
          }
        });
  }
}
