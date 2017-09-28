import { Injectable } from "@angular/core";
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class EnvironmentInfoService {
  constructor(private appVersion: AppVersion) {
  }

  getAppVersion() {
    return this.appVersion.getVersionCode();
  }
}
