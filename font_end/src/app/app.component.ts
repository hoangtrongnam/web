import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { User } from './_models/user';
import { AuthenticationService } from '@/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.translate.addLangs(['en', 'vi']);
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
