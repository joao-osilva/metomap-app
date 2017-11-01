import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {BuildingsInfoService} from "../../services/buildings-info.service";
import {Building} from "../buildings/building/domain/building-info";
import {MapPage} from "./map/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  buildings: Building[];
  fromBuilding: string;
  toBuilding: string;
  fromOpts: { title: string, subTitle: string };
  toOpts: { title: string, subTitle: string };
  isButtonDisabled: boolean;

  constructor(private navCtrl: NavController,
              private buildingsInfoService: BuildingsInfoService,
              private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.initialSetUp();
    this.getBuildingsInfo();
  }

  initialSetUp() {
    // clear selection
    this.fromBuilding = null;
    this.toBuilding = null;

    // set select info
    this.fromOpts = {
      title: 'Origem',
      subTitle: 'Selecione seu ponto de partida'
    };

    this.toOpts = {
      title: 'Destino',
      subTitle: 'Selecione seu ponto de chegada'
    };

    // disable button
    this.isButtonDisabled = false;
  }

  getBuildingsInfo() {
    this.buildingsInfoService.getAllBuildingsInfo()
                             .subscribe(data => this.buildings = data,
                                        error => console.log(error));
  }

  onViewMap() {
    if (this.fromBuilding == this.toBuilding) {
      this.showSameSelectionAlert();
    } else {
      this.navCtrl.push(MapPage, {startNode: this.getBuildingCoordinates(this.fromBuilding),
                                  endNode: this.getBuildingCoordinates(this.toBuilding)});
    }
  }

  getBuildingCoordinates(key: string) {
    return this.buildings.find(building => building.key == key).coordinates;
  }

  buildingsSelected() {
    if ((this.fromBuilding && this.fromBuilding.trim() != '') &&
        (this.toBuilding && this.toBuilding.trim() != '')) {
      this.isButtonDisabled = false;
    }
  }

  showSameSelectionAlert() {
    let alert = this.alertCtrl.create({
      title: 'Escolha pontos diferentes!',
      subTitle: 'A origem e o destino não podem ser iguais',
      buttons: ['OK']
    });
    alert.present();
  }

}
