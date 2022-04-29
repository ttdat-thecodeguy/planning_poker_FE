import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Issue } from "src/app/model/issue.model";

@Component({
    selector: 'issue-dig',
    templateUrl: './issue-details.dialog.html',
    styleUrls: ['./issue-details.dialog.css']
  })
  export class IssueDetailsDialog implements OnInit{
    ngOnInit(): void {}
  
    constructor(@Inject(MAT_DIALOG_DATA) public data : Issue ) {}
  }