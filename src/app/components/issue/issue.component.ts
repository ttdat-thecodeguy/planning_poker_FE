import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from 'src/app/model/issue.model';
import { IssueDetailsDialog } from 'src/app/shards/dialog/issue-details/issue-details.dialog';




@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() issue? : Issue;
  
  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  onOpenIssueDetails(){
    this.dialog.open(IssueDetailsDialog, { data: this.issue })
  }
}
