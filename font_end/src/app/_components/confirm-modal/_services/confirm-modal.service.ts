import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  private subject = new Subject<any>();

  constructor() { }

  onConfirmModal(): Observable<any> {
    return this.subject.asObservable();
  }

  confirmModal(title: string, message: string, okFn: () => void, cancelFn: () => void) {
    this.setConfirmation(title, message, okFn, cancelFn);
  }

  private setConfirmation(title: string, message: string, okFn: () => void, cancelFn: () => void) {
    let that = this;
    this.subject.next({ 
      title, 
      message,
      okFn: () => {
        that.subject.next();
        okFn();
      },
      cancelFn: () => {
        that.subject.next();
        cancelFn();
      }
    })
  }

  clear() {
    this.subject.next();
  }
}
