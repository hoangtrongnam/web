import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

export class BreadCrumb {
  url: string;
  name: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private behaviorSubject = new BehaviorSubject<BreadCrumb[]>([]);

  constructor() { }

  onBreadCrumb(): Observable<BreadCrumb[]> {
    return this.behaviorSubject.asObservable();
  }

  breadCrumb(value: BreadCrumb[]) {
    this.behaviorSubject.next(value);
  }

  clear() {
    this.behaviorSubject.next([]);
  }
}
