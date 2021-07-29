import { Component, OnInit } from '@angular/core';

import { BreadCrumb, BreadCrumbService } from './_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadCrumbs: BreadCrumb[];
  private subscription: Subscription;

  constructor(
    private breadCrumbService: BreadCrumbService
  ) { }

  ngOnInit() {
    this.subscription = this.breadCrumbService.onBreadCrumb().subscribe(x => this.breadCrumbs = x);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
