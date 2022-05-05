import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-import-issue-as-urls',
  templateUrl: './import-issue-as-urls.component.html',
  styleUrls: ['./import-issue-as-urls.component.css']
})
export class ImportIssueAsUrlsComponent implements OnInit {
  testLink : RegExp = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  urls: string[] = [];
  constructor(private dialogRef : MatDialogRef<ImportIssueAsUrlsComponent>, private issueService : IssueService) { }
  data = ""
  ngOnInit(): void {
  }
  onChangeIssueInput(e : any){
    this.urls = [];
    let data : string[] = e.split("\n");
    for(let item in data){
        if(this.testLink.test(data[item])){
          this.urls.push(data[item])
        }
    }
  }

  onImportIssue(){
    this.dialogRef.close({
      data : this.urls
    })
  }
}
