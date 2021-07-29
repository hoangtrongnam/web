import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Template } from '@/_helpers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  constructor() {
    
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    Template.initPage();
    Template.initLayout();
  }

}
