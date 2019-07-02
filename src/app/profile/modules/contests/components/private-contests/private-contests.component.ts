import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestModel} from '../../../../../shared/model/contest/contest.model';
import {ProfileService} from '../../../../services/profile.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-private-contests',
  templateUrl: './private-contests.component.html',
  styleUrls: ['../../column.component.scss']
})
export class PrivateContestsComponent implements OnInit, OnDestroy {

  public contests: ContestModel[];
  private unsubscribeAll: Subject<any>;

  constructor(private profileService: ProfileService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.profileService.contests
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contests => {
        this.contests = [];
        contests.forEach(contest => {
          if (contest.type !== 'PUBLIC') {
            this.contests.push(contest);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
