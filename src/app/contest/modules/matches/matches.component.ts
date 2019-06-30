import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CompetitionModel} from '../../../shared/model/football/competition.model';
import {MatchesService} from './services/matches.service';
import {MatchModel} from '../../../shared/model/football/match.model';
import {ContestModel} from '../../../shared/model/contest/contest.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {

  public competition: CompetitionModel;
  public matches: MatchModel[];
  public contest: ContestModel;
  public days: number[];
  public selectedDay: number;
  private unsubscribeAll: Subject<any>;

  constructor(public contestService: ContestService,
              private matchesService: MatchesService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.contest
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.contest = res;
      });
    this.contestService.competition
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.competition = res;
        this.days = Array.from(new Array(this.competition.currentSeason.availableMatchday), (x, i) => i + 1);
      });

    this.matchesService.matches
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(matches => {
        this.matches = matches;
      });

    this.matchesService.selectedMatchDay
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(day => {
        this.selectedDay = day;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  selectMatchDay(matchDay: number) {
    this.matchesService.selectedMatchDay.next(matchDay);
    this.matchesService.getMatches(this.contest.competition.id, matchDay).toPromise()
      .then(res => {
        this.matchesService.matches.next(res);
      })
      .catch(error => {

      });
  }

}
