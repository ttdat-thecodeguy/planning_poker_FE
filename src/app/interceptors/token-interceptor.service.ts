import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, isEmpty } from 'lodash';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../service/users.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private store : Store<{ auth : any }>, private userService : UserService, private route : Router) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let data = localStorage.getItem('userLogin');
    let $auth: any
    if(data !== null) {
      $auth = JSON.parse(data)
    }
        
    if($auth === undefined){
        this.store.select('auth').subscribe(item => $auth = item.auth)
    }

    if(!isEmpty($auth)){
      if(!req.url.includes('refresh-token')){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${$auth.token}`,
          }
        })
      }    
    } 
    return next.handle(req).pipe(
      catchError((err) => {

        console.log(err)

        switch(err.status) {
          case 401:
            this.userService.logOut();
            break;
          case 404:
            this.route.navigate([
              '/404'
            ])
            break;
          case 400:
            if($auth.refreshToken !== null && err.error.isJwtExpired !== undefined && err.error.isJwtExpired !== null && err.error.isJwtExpired === true){
              /// remove headers
              this.userService.refreshToken($auth.refreshToken).subscribe(resp => {
                this.userService.refreshTokenSubscribe(resp)
              });
            } else{
              /// call logout /// trường hợp user is guest
              this.userService.logOut()
            }
            break;
          case 500:
            if(err.error.isUserNotFound !== undefined && err.error.isUserNotFound === true){
              this.userService.logOut()
            }
            break;
          case 0:
            /// server error by connection refused
            console.log("Connection refused")
            break;
        }

      
        // const error = err.error.message || err.statusText;
        
        return throwError((err: any) => err);
      })
    );
  }
  
}
