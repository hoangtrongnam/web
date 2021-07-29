import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Template } from '@/_helpers';
import { MenuService } from '@/_services/menu.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  constructor(
      private menuService:MenuService
    ) {
  }

  async ngOnInit() {
    await this.getMenu();
  }
  async getMenu()
  {
    var dataMenu = await this.menuService.GetMenu();
    console.log(dataMenu);
  }
  ngAfterViewInit() {
    Template.initPage();
    Template.initLayout();
  }

}
