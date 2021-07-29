import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from './_services';
import { Notification, NotificationType } from './_models/notification';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification [] = [];
  private subscription: Subscription;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.subscription = this.notificationService.onNotification().subscribe(notification => {
      this.notifications.push(notification);

      if (notification.timeout !== 0) {
        setTimeout( () => this.close(notification), notification.timeout);
      }
    })
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter( noti => noti.id != notification.id );
  }

}
