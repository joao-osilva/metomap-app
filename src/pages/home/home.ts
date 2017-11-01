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
    if (!this.fromBuilding) {
      this.showAlert('Escolha a origem!', 'A origem não foi selecionada');
    }
    else if (!this.toBuilding) {
      this.showAlert('Escolha o destino!', 'O destino não foi selecionado');
    }
    else if (this.fromBuilding == this.toBuilding) {
      this.showAlert('Escolha pontos diferentes!', 'A origem e o destino não podem ser iguais');
    }
    else {
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

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
