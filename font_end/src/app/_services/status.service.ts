import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class StatusService {
    constructor(private http: HttpClient) {
    }
    GetListStatus(request) {
        return this.http.post<any>(`${environment.apiUrl}/status/getstatus?PSTATUS_STYPE=${request}`, {}).toPromise();
    }
}