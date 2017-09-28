import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { BuildingsPage } from '../buildings/buildings';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabBuildings = BuildingsPage;
  tabAbout = AboutPage;


  constructor() {

  }
}
