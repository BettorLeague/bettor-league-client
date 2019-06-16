import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContestService } from './services/contest.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DialogData } from './contest-dialog.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contest-dialog',
  templateUrl: './contest-dialog.component.html',
  styleUrls: ['./contest-dialog.component.scss']
})
export class ContestDialogComponent implements OnInit {
  public competitions: any;
  private unsubscribeAll: Subject<any>;
  newCompetitionName: string;
  newCompetitionId: number;
  contestDialogForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contestService: ContestService,
  ) {
    this.unsubscribeAll = new Subject();
    this.newCompetitionName = data.newCompetitionName;
    this.newCompetitionId = data.newCompetitionId;

    this.contestDialogForm = formBuilder.group({
      newCompetitionName: [data.newCompetitionName, Validators.required],
      newCompetitionId: [data.newCompetitionId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.contestService.getCompetitions()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.competitions = res;
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submitContestDialogForm(): void {
    this.dialogRef.close(this.contestDialogForm.value);
  }

}
