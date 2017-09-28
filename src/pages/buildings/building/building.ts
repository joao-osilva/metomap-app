import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Building} from "./domain/building-info";
import {BuildingsInfoService} from "../../../services/buildings-info.service";
import {CallNumber} from "@ionic-native/call-number";

@Component({
  selector: 'page-building',
  templateUrl: 'building.html'
})

export class BuildingPage {
  buildingKey: string;
  buildingInfo: Building;

  constructor(private navParams: NavParams,
              private buildingsInfoService: BuildingsInfoService,              
              private callNumber: CallNumber) {
    this.buildingKey = this.navParams.get('buildingKey');
  }

  ionViewWillEnter() {
    this.getBuildingInfo(this.buildingKey);
  }

  getBuildingInfo(buildingKey: string) {
    this.buildingsInfoService.getAllBuildingsInfo()
                             .subscribe(data => this.buildingInfo = data.find(res => res.key == buildingKey),
                                        error => console.log(error));
  }

  onCallRoom(phoneNumber: string) {
    let num = phoneNumber.replace(/\(|\)|-|\s+/g, '');

    this.callNumber.callNumber(num, true)
                   .then(() => console.log('calling number ' + phoneNumber))
                   .catch(() => console.log('error launching dialer...'));
  }

}
