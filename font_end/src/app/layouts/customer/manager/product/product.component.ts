import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from '@/_services';
import { MatDialog } from '@angular/material';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  returnUrl: any;
  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    await this.initData();
  }
  async initData() {    
  }
  async onSubmitSearch() {
  }
  async onSave() {
  }
   
}
