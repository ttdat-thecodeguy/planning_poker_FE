import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VotingSys } from "../model/vote-sys.model"

/**
 * @deprecated The class should not used
 */
@Injectable({
    providedIn: 'root',
})
export class VotingService {
    constructor(private http : HttpClient) {}
    // addVoting(votingSys : VotingSys, ) : Observable<VotingSys>{
    //     return; 
    // }
}