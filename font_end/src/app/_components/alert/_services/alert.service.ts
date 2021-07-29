import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(
    private router: Router
  ) { 
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert messages
              this.clear();
          }
      }
    });
  }
  // enable subscribing to alerts observable
  onAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  // convenience methods
  success(message: string, keepAfterRouteChange = false) {
    this.alert(message, 'success', keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(message, 'error', keepAfterRouteChange);
  }

  // main alert method    
  alert(message, type, keepAfterRouteChange) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type, message });
  }

  // clear alerts
  clear() {
    this.subject.next();
  }
}
