import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BuildingPage} from "./building/building";
import {BuildingsInfoService} from "../../services/buildings-info.service";
import {Building} from "./building/domain/building-info";

@Component({
  selector: 'page-buildings',
  templateUrl: 'buildings.html'
})
export class BuildingsPage {
  buildingsInfo: Building[];
  filteredBuildings: Building[];
  isSearchOff: boolean;
  searchQuery: string;

  constructor(private navCtrl: NavController, private buildingsInfoService: BuildingsInfoService) {
    this.getBuildingsInfo();
  }

  ionViewWillEnter() {
    this.searchQuery = null;
    this.isSearchOff = true;
    this.getBuildingsInfo();
  }

  onViewBuildingInfo(buildingKey: string) {
    this.navCtrl.push(BuildingPage, {buildingKey: buildingKey});
  }

  getBuildingsInfo() {
    this.buildingsInfoService.getAllBuildingsInfo()
                             .subscribe(data => this.buildingsInfo = data,
                                        error => console.log(error));
  }

  getItems(ev: any) {
    this.isSearchOff = false;
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.filteredBuildings = this.buildingsInfo.filter(building => this.filterItems(building, val));
    } else {
      this.filteredBuildings.length = 0;
      this.isSearchOff = true;
    }
  }

  filterItems(building: Building, val: any){
    var result:boolean;

    if(building.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
      result = true;
    }

    if (building.rooms.length > 1) {
      building.rooms.filter((room) => {
        if(room.number.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          room.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          result = true;
        }
      })
    }

    return result ? result: false;
  }

}
