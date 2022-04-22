import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, NotFoundError, Observable, throwError } from "rxjs";
import { Table } from "../model/table.model";
import { API_URL } from "../model/constants/constants"
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
}