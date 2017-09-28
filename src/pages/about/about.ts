import {Component} from '@angular/core';
import {AboutInfoService} from "../../services/about-info.service";
import {AppCreators} from "./domain/app-creators";
import {SocialMedias} from "./domain/social-medias";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Platform} from "ionic-angular";
import {EnvironmentInfoService} from "../../services/environment-info.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private appCreatorsInfo: AppCreators[];
  private socialMediasInfo: SocialMedias[];
  private appVersion: any;

  constructor(private envInfoService: EnvironmentInfoService,
              private aboutInfoService: AboutInfoService,
              private platform: Platform,
              private iab: InAppBrowser) {
    this.envInfoService.getAppVersion().then((data) => this.appVersion = data);
  }

  ionViewWillEnter() {
    this.getAppCreatorsInfo();
    this.getSocialMediasInfo();
  }

  getAppCreatorsInfo() {
    this.aboutInfoService.getAppCreatorsInfo()
                         .subscribe(data => this.appCreatorsInfo = data,
                                    error => console.log(error));
  }

  getSocialMediasInfo() {
    this.aboutInfoService.getSocialMediasInfo()
                         .subscribe(data => this.socialMediasInfo = data,
                                    error => console.log(error));
  }

  openLink(url: string) {
    this.platform.ready().then(() => {
      let browser = this.iab.create(url, '_system', 'location=no');

      browser.on('exit').subscribe(() => {
        console.log('Exit In-App Browser');
      });
    });

  }
}
