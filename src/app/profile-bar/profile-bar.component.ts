import {AuthenticationService} from '../authentication/services/authentication.service';
import {Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContestDialogComponent } from '../contest-dialog/contest-dialog.component';
import { ContestRequestModel } from '../contest-dialog/models/contest.model';
import { ContestService } from '../contest-dialog/services/contest.service';
import { SnackBarService } from '../shared/service/snack-bar.service';
import { SnackBarType } from '../shared/model/snack-bar.type';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent {

  newCompetitionName: string;
  newCompetitionId: number;

  constructor(
    public authService: AuthenticationService,
    public dialog: MatDialog,
    public contestService: ContestService,
    public snackBar: SnackBarService
  ) {}

  addContext() {
    const dialogRef = this.dialog.open(ContestDialogComponent, {
      width: '450px',
      data: { newCompetitionName: this.newCompetitionName, newCompetitionId: this.newCompetitionId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const privateContest = new ContestRequestModel(result.newCompetitionName, result.newCompetitionId);
        this.contestService.createPrivateContest(privateContest).toPromise()
          .then(() => {
            this.snackBar.show(SnackBarType.success, `Le concours privé ${result.caption} a été crée avec succés`);
            // Rediriger vers la page du contest qui vient d'être crée
          })
          .catch(() => {
            this.snackBar.show(SnackBarType.error, `Une erreur s'est produite`);
          });
      }
    });
  }

}
