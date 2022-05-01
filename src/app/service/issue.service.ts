import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../model/constants/constants";
import { Issue } from "../model/issue.model";

@Injectable({
    providedIn: 'root',
})
export class IssueService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http : HttpClient) {}
    findListIssueByTableId(tableId : string) : Observable<Issue[]>{
        return this.http.get<Issue[]>(`${API_URL}/issue?tableId=${tableId}`)
    }

    addIssue(name : string | null, link : string | null, description : string | null, storyPoint: string | null, tableId: string ) : Observable<Issue>{
        let data = {
            name, 
            link,
            description,
            storyPoint
        }
        return this.http.post<Issue>(`${API_URL}/issue/add?tableId=${tableId}`, data, this.httpOptions)
    }

    importIssueAsCSV(file : File, tableId : string, isIncludeHeader : boolean) : Observable<Issue[]>{
        const formData = new FormData();
        formData.append("file", file, file.name)
        return this.http.post<Issue[]>(`${API_URL}/issue/import-as-csv?tableId=${tableId}&isIncludeHeader=${isIncludeHeader}`, formData);
    }
    deleteIssue(tableId : string) : Observable<any>{
        return this.http.delete(`${API_URL}/issue/delete-all?tableId=${tableId}`)
    }
}