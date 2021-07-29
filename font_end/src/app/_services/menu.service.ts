
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';import { MenuModel } from '@/_models/menu.model';


@Injectable({ providedIn: 'root' })
export class MenuService {

    constructor(private http: HttpClient) {
    }

    GetMenu(request: MenuModel = new MenuModel) {
        return this.http.post<any>(`${environment.apiUrl}/menu/get_menu`, request).toPromise();
    }
}