import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take  } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                public authService: AuthenticationService) {}
                
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // add authorization header with jwt token if available
    //     const currentUser = this.authenticationService.currentUserValue;
    //     if (currentUser && currentUser.token) {
    //         request = request.clone({
    //             setHeaders: {
    //                 Authorization: `Bearer ${currentUser.token}`
    //             }
    //         });
    //     }

    //     return next.handle(request);
    // }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }

        return next.handle(request)
        .pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    //this.authenticationService.verify();
                    return this.handle401Error(request, next);
                  } else {
                    console.log(error.status);
                      if(error.status === 0){
                        //location.reload();
                      }
                    //return Observable.throw(error);
                    return throwError(error);
                  }
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token.jwt);
                return next.handle(this.addToken(request, token.jwt));
            }));

        } else {
            return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
            }));
        }
    }
}