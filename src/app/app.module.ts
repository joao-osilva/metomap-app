import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { BuildingsPage } from '../pages/buildings/buildings';
import { BuildingPage } from '../pages/buildings/building/building';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/home/map/map';
import { TabsPage } from '../pages/tabs/tabs';

import { BuildingsInfoService } from '../services/buildings-info.service';
import { AboutInfoService } from '../services/about-info.service';
import { EnvironmentInfoService } from '../services/environment-info.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from "@ionic-native/keyboard";
import { AppVersion } from '@ionic-native/app-version';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    BuildingsPage,
    BuildingPage,
    HomePage,
    MapPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    BuildingsPage,
    BuildingPage,
    HomePage,
    MapPage,
    TabsPage
  ],
  providers: [
    CallNumber,
    AppVersion,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Keyboard,
    BuildingsInfoService,
    AboutInfoService,
    EnvironmentInfoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
