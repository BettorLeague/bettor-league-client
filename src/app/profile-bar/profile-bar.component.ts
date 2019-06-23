import {AuthenticationService} from '../authentication/services/authentication.service';
import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContestDialogComponent } from '../contest-dialog/contest-dialog.component';
import { ContestRequestModel } from '../contest-dialog/models/contest.model';
import { ContestService } from '../contest-dialog/services/contest.service';
import { SnackBarService } from '../shared/service/snack-bar.service';
import { SnackBarType } from '../shared/model/snack-bar.type';
import { Router } from '@angular/router';
import { ProfileBarService } from './services/profile-bar.service';
import { ContestModel } from '../shared/model/contest/contest.model';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit {

  newCompetitionName: string;
  newCompetitionId: number;
  privateContests: ContestModel[];

  constructor(
    public authService: AuthenticationService,
    public dialog: MatDialog,
    public contestService: ContestService,
    public snackBar: SnackBarService,
    public router: Router,
    public profileBarService: ProfileBarService
  ) {}

  ngOnInit() {
    this.getUserContests();
  }

  getUserContests() {
    this.profileBarService.getUserContests().subscribe(res => {
      const givenPrivateContests = res.filter(contest => contest.type === 'PRIVATE');
      this.privateContests = givenPrivateContests;
    });
  }

  addContext() {
    const dialogRef = this.dialog.open(ContestDialogComponent, {
      width: '450px',
      data: { newCompetitionName: this.newCompetitionName, newCompetitionId: this.newCompetitionId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const privateContest = new ContestRequestModel(result.newCompetitionName, result.newCompetitionId);
        this.contestService.createPrivateContest(privateContest).toPromise()
          .then(response => {
            this.snackBar.show(SnackBarType.success, `Le concours privé ${response.caption} a été crée avec succés`);
            this.router.navigate([`contest/${response.id}`]);
            this.getUserContests();
          })
          .catch(() => {
            this.snackBar.show(SnackBarType.error, `Une erreur s'est produite`);
          });
      }
    });
  }
}
