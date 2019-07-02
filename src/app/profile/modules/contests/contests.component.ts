import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ContestModel } from 'src/app/shared/model/contest/contest.model';
import { MyAnimations } from '../../../shared/animation';
import {ContestService} from '../../../contest/services/contest.service';
import {SnackBarService} from '../../../shared/service/snack-bar.service';
import {SnackBarType} from '../../../shared/model/snack-bar.type';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
  animations: MyAnimations
})
export class ContestsComponent implements OnInit {

  public publicContests: ContestModel[];
  public privateContests: ContestModel[];

  constructor(private profilService: ProfileService, private contestService: ContestService, private snackBarService: SnackBarService) {
    this.privateContests = [];
    this.publicContests = [];
  }

  ngOnInit() {
    this.profilService.contests.subscribe(contests => {
      contests.forEach(contest => {
        if (contest.type === 'PUBLIC') {
          this.publicContests.push(contest);
        } else {
          this.privateContests.push(contest);
        }
      });
    });
  }

  unsubscribeFromContest(contestInfo: {id: number, type: string}) {
    this.contestService.unSubscribeContest(contestInfo.id).toPromise()
        .then(() => {
          if (contestInfo.type === 'PUBLIC') {
            this.publicContests = this.publicContests.filter(contest => contest.id !== contestInfo.id);
          } else {
            this.privateContests = this.privateContests.filter(contest => contest.id !== contestInfo.id);
          }
          this.snackBarService.show(SnackBarType.success, 'You have succesfuly unsubscribe from the contest');
        })
        .catch(() => {
          this.snackBarService.show(SnackBarType.error, 'Oops! Something went wrong');
        });
  }

}
