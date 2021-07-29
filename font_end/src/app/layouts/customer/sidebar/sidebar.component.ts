import { Component, OnInit } from '@angular/core';

import { User } from '@/_models';
import { AuthenticationService } from '@/_services';
import { MenuService } from '@/_services/menu.service';

@Component({
  selector: '[app-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any;
  menus: any = [];
  private readonly MENU = 'MENU';
  
  constructor(
    private authenticationService: AuthenticationService,
    private menuService: MenuService
  ) {
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  async ngOnInit() {
    //this.menus = JSON.parse(localStorage.getItem(this.MENU));
    await this.getMenu();
  }
  async getMenu()
  {
    this.menus = await this.menuService.GetMenu();
    console.log(this.menus);
  }

}
