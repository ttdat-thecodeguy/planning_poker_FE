import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {  Observable } from "rxjs";
import { API_URL } from "../model/constants/constants";
import { Token } from "../model/token.model";
import { UserSignError } from "../model/user-error.model";
import { UserResponse } from "../model/user-response.model";
import { refreshTokenAction, userLogoutAction, userSpectatorModeAction } from "../store/actions/users.action";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    $auth : any

    constructor( private http : HttpClient,private store: Store<{ auth: any }>, private router : Router ) {}
    login(email : string, password: string) : Observable<UserResponse | UserSignError> {
        let data = {
            email,
            password
        }
        return this.http.post<UserResponse>(`${API_URL}/login`,data, this.httpOptions)
    }
    signup(email : string, password : string, displayName : string){
        let data = {
            email,
            password,
            displayName
        }
        return this.http.post<UserResponse | UserSignError>(`${API_URL}/signup`,data, this.httpOptions)
    }
    signupAsGuest(displayName : string, tableId : string,  isSpectator : boolean){
        let data = {
            displayName
        }
        return this.http.post<UserResponse>(`${API_URL}/signup-as-guest?isSpectator=${ isSpectator ? true : false }&tableId=${tableId}`,data, this.httpOptions)
    }

    activeSpectatorMode(isActive : boolean){
        // spectorMode
        this.store.dispatch(userSpectatorModeAction({ payload: isActive }));
        // update in storage
        let json = localStorage.getItem("userLogin");
        if(json !== null){
            let user = JSON.parse(json);
            user.spectorMode = isActive;
            localStorage.setItem("userLogin", JSON.stringify(user));
        }
    }

    refreshToken(refreshToken : string) : Observable<any>{
        /*
            get data from store or application storage
        */
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : '' })
        };
        let data = {
            refreshedToken : refreshToken
        }
        return this.http.post(`${API_URL}/refresh-token`, data  , this.httpOptions);
    }

    refreshTokenSubscribe(t : Token) {
        this.store.dispatch(refreshTokenAction({ payload : t.token }))
        let auth = JSON.parse(localStorage.getItem('userLogin')!);
        if(auth){
            console.log("set new token " + t.token);
            auth.token = t.token;
            localStorage.setItem('userLogin', JSON.stringify(auth))
        }
    }

    logOut(){
        this.store.dispatch(userLogoutAction());
        localStorage.removeItem('userLogin');
        this.router.navigate(['/dashboard']) 
        window.location.href = "/dashboard"  
    }

    
}