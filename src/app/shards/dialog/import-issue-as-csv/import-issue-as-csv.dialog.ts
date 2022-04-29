import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { BehaviorSubject, Observable } from "rxjs";
import { Issue } from "src/app/model/issue.model";
import { IssueService } from "src/app/service/issue.service";

@Component({
    selector: "upload-csv-dialog",
    templateUrl: "./import-issue-as-csv.dialog.html",
    styleUrls: ['./import-issue.dialog.css']
})
export class ImportIssueAsCSVDialog implements OnInit{

    file: File | undefined
    
    dataSource?: any;
    displayedColumns: string[] = ['Summary', 'Description', 'Key', 'Link', 'Story Points'];
    checkedValue: boolean = false

    issueData : Issue[] = [];

    constructor(private ngxCsvParser: NgxCsvParser, 
                private issueService : IssueService , 
                @Inject(MAT_DIALOG_DATA) private tableId : string,
                private dRef : MatDialogRef<ImportIssueAsCSVDialog>
                ) {}
    ngOnInit(): void {
    }

    onChangeFileUpload(event: any) {

        /// preview issue table

        this.file = event.target.files[0];
        this.ngxCsvParser.parse(this.file!, { header: this.checkedValue, delimiter: ',' }).pipe().subscribe(item => {
            this.dataSource = new TableData(item);
        }, err => {

        })
    }
    onUploadCSV(){

        this.issueService.importIssueAsCSV(this.file!, this.tableId, this.checkedValue).subscribe(item => {
            this.dRef.close({ item })
        }, err => {
            console.log(err);
        })

        
    }
    // onIncludeHeaderChange(event : any){}

    getObjectByValue(obj : any){
        return Object.values(obj);
    }

    onTurnToUpload(){
        this.dataSource = undefined;
    }

}
export class TableData extends DataSource<any>{

    data : any;

    constructor(data : any){
        super();
        this.data = new BehaviorSubject<any[]>(data);
    }



    connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
        return this.data;
    }
    disconnect(collectionViewer: CollectionViewer): void {}

}