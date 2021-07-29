import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, tap  } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                public authService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            tap(suc => {
            //   if(suc.type !== 0){
            //     const oam_user = suc['headers'].get('OAM_REMOTE_USER');
            //     alert(oam_user);
            //     }
            })
          );
    }
}