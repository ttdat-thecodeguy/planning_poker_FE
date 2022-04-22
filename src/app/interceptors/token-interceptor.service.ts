import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
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
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${$auth.token}`,
        }
      })
    } 
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        switch(err.status) {
          case 401:
            this.userService.logOut();
            break;
          case 404:
            this.route.navigate([
              '/404'
            ])
            break;

        }

      
        // const error = err.error.message || err.statusText;
        
        return throwError((err: any) => console.log(err));
      })
    );
  }
  
}
