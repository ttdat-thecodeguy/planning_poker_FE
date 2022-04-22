import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {  Observable } from "rxjs";
import { API_URL } from "../model/constants/constants";
import { UserSignError } from "../model/user-error.model";
import { UserResponse } from "../model/user-response.model";
import { userLogoutAction } from "../store/actions/users.action";


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
        return this.http.post<UserResponse>(`${API_URL}/signup-as-guest?isSpectator=${ isSpectator ? 1 : 0 }&tableId=${tableId}`,data, this.httpOptions)
    }
    logOut(){
        this.store.dispatch(userLogoutAction());
        localStorage.removeItem('userLogin');
        this.router.navigate(['/dashboard'])      
    }

    
}