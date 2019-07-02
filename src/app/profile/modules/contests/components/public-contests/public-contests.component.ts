import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ContestModel} from '../../../../../shared/model/contest/contest.model';
import {Subject} from 'rxjs';
import {ProfileService} from '../../../../services/profile.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-public-contests',
  templateUrl: './public-contests.component.html',
  styleUrls: ['../../column.component.scss']
})

export class PublicContestsComponent implements OnInit, OnDestroy {

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
          if (contest.type === 'PUBLIC') {
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
