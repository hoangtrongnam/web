import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { List } from 'linq-typescript';
import { Tokens } from '@/_models/tokens';
import { User } from '@/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {    
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private readonly CURRENT_USER = 'CURRENT_USER';
    private readonly ORG_MENU = 'ORG_MENU';
    private readonly MENU = 'MENU';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    

    constructor(private http: HttpClient,
        private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.CURRENT_USER)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getChirrentMenu(menu, orgMenus){
        menu.menus = new List<any>(orgMenus).where(w=>w.parentid === menu.id).toArray();
        menu.menus.forEach(item => {
            this.getChirrentMenu(item, orgMenus);
        });
    }
    verify() {
        return this.http.get<any>(`${environment.apiUrl}/account/verify`)
            .pipe(map(user => {                

                let menus = new List<any>(user.data.menus).where(w=>w.parentid === null).toArray();
                
                menus.forEach(menu => {
                    this.getChirrentMenu(menu,user.data.menus);
                });
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(this.CURRENT_USER, JSON.stringify(user.data.info));
                localStorage.setItem(this.ORG_MENU, JSON.stringify(user.data.menus));
                localStorage.setItem(this.MENU, JSON.stringify(menus));
                // store token
                this.storeTokens({jwt : user.data.token, refreshToken : ''});

                
                this.currentUserSubject.next(user.data.info);
                //location.reload();
                return user;
            }, error =>{
                console.log(error);
            }));
    }
    
    login(username, password) {
        return this.http.post<any>(`${environment.apiUrl}/account/login`, { username, password })
            .pipe(map(user => {
                

                let menus = new List<any>(user.data.menus)
                .where(w=> w.parentid == "")
                .toArray();
                
                menus.forEach(menu => {
                    this.getChirrentMenu(menu,user.data.menus);
                });
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(this.CURRENT_USER, JSON.stringify(user.data.info));
                localStorage.setItem(this.ORG_MENU, JSON.stringify(user.data.menus));
                localStorage.setItem(this.MENU, JSON.stringify(menus));
                // store token
                this.storeTokens({jwt : user.data.token, refreshToken : ''});

                
                this.currentUserSubject.next(user.data.info);
                return user;
            }, error =>{
                console.log(error);
            }));
    }
    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }
    isLoggedIn() {
        return !!this.getJwtToken();
    }
    refreshToken() {
        return this.http.get<any>(`${environment.apiUrl}/account/${this.getRefreshToken()}/refresh`).pipe(tap((tokens: any) => {
                localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
            }, error =>{
                this.logout();
                this.router.navigate(['login']);
            }));
    }
    logout() {
        // remove user from local storage and set current user to null
        this.currentUserSubject.next(null);
        this.removeStorage();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }
    private removeStorage() {
        localStorage.removeItem(this.MENU);
        localStorage.removeItem(this.ORG_MENU);
        localStorage.removeItem(this.CURRENT_USER);
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
      }
}