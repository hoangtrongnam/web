import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Notification, NotificationType } from '../_models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<Notification>();
  private notificationId = 0;

  constructor() { }

  onNotification(): Observable<Notification> {
    return this.subject.asObservable();
  }

  success(title: string, message: string, timeout = 5000) {
    this.subject.next(new Notification(this.notificationId++, NotificationType.success, title, message, timeout, 'alert alert-success my-noti-alert'));
  }

  error(title: string, message: string, timeout = 8000) {
    this.subject.next(new Notification(this.notificationId++, NotificationType.error, title, message, timeout, 'alert alert-danger my-noti-alert'));
  }

  clear() {
    this.subject.next();
  }
}
