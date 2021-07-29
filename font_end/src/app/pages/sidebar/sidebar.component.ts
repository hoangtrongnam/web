import { Component, OnInit } from '@angular/core';

import { User } from '@/_models';
import { AuthenticationService } from '@/_services';

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
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.menus = JSON.parse(localStorage.getItem(this.MENU));
  }

}
