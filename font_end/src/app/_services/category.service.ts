
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    GetListCategory() {
        return this.http.post<any>(`${environment.apiUrl}/category/getlist`, {}).toPromise();
    }

    GetDetailCategory(danhmuc_id) {
        return this.http.get<any>(`${environment.apiUrl}/category/getdatabyid?danhmuc_id=` + danhmuc_id).toPromise();
    }
}