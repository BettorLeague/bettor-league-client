import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestService } from './services/contest.service';
import { ContestDialogComponent } from './contest-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContestDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  entryComponents: [ContestDialogComponent],
  exports: [ContestDialogComponent],
  providers: [
    ContestService
  ]
})
export class ContestDialogModule { }
