import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class AllocationService {
    constructor(
        private http: HttpClient
        ) {
    }
    searchInforAllocationACQT(request) {
        return this.http.post<any>(`${environment.apiUrl}/requestforproviding/get`, request).toPromise();
    }
    
    ApproveAllocationACQT(request) {
        return this.http.post<any>(`${environment.apiUrl}/requestforproviding/approved_allocation`, request).toPromise();
    }
}