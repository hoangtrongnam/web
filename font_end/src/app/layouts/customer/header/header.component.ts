import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  languageList: any = {
    vi: {
      class: "flag-icon flag-icon-vn",
      name: "Vietnamese"
    },
    en:{
      class: "flag-icon flag-icon-gb",
      name: "English"
    }
  };  

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  onChangeLanguage(lang) {
    this.translate.use(lang);
  }
}
