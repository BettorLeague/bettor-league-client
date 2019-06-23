import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {Subject} from 'rxjs';
import {HomeService} from '../../../home/services/home.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {takeUntil} from 'rxjs/operators';
import {CompetitionModel} from '../../../shared/model/football/competition.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {

  public competition: CompetitionModel;
  public days: number[];
  private unsubscribeAll: Subject<any>;

  constructor(public contestService: ContestService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.competition
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.competition = res;
        this.days = Array.from(new Array(this.competition.currentSeason.availableMatchday), (x, i) => i + 1);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
