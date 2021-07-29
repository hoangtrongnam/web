import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertService } from './_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: any;
  private subscription: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.onAlert()
      .subscribe(alert => {
        switch (alert && alert.type) {
          case 'success':
              alert.cssClass = 'alert alert-success my-alert-success';
              alert.textClass = 'text-success';
              break;
          case 'error':
              alert.cssClass = 'alert alert-danger my-alert-danger';
              alert.textClass = 'text-danger';
              break;
        }

        this.alert = alert;
      });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
