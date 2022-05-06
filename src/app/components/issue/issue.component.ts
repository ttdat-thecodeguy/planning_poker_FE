import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from 'src/app/model/issue.model';
import { TableService } from 'src/app/service/table.service';
import { IssueDetailsDialog } from 'src/app/shards/dialog/issue-details/issue-details.dialog';




@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() issue? : Issue;
  @Input() isSelectedIssue : boolean = false;
  @Output() itemEvent = new EventEmitter<Issue>();

  constructor(private dialog : MatDialog) { }
  ngOnInit(): void {
  }

  onVotingIssue(){
    this.issue!.isSelected = this.isSelectedIssue;
    this.itemEvent.emit(this.issue)  
  }
  onOpenIssueDetails(){
    this.dialog.open(IssueDetailsDialog, { data: this.issue })
  }
}
