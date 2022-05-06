import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, NotFoundError, Observable, throwError } from "rxjs";
import { Table } from "../model/table.model";
import { API_URL } from "../model/constants/constants"
import { Issue } from "../model/issue.model";
@Injectable({
    providedIn: 'root',
})
export class TableService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient){}
    
    createTable(table : Table) : Observable<Table>{
        return this.http.post<Table>(`${API_URL}/table/add`, table, this.httpOptions)
    }


    findTableById(tableId : string) : Observable<Table>{
        return this.http.get<Table>(`${API_URL}/table/${tableId}`);
    }

    updateOwner(tableId : string, userId : number) : Observable<Table>{
        let data = {
            tableId,
            userId
        }
        return this.http.patch<Table>(`${API_URL}/table/update-owner`, data, this.httpOptions);
    }

    updateTableIssue(tableId : string, issueId : string, isAdd : boolean) : Observable<Issue>{
        let data = {
            tableId,
            issueId,
            isAdd
        }
        return this.http.patch<Issue>(`${API_URL}/table/update-issue`, data, this.httpOptions);
    }
}