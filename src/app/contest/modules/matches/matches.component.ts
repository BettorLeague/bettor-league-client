import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CompetitionModel} from '../../../shared/model/football/competition.model';
import {MatchesService} from './services/matches.service';
import {MatchModel} from '../../../shared/model/football/match.model';
import {ContestModel} from '../../../shared/model/contest/contest.model';
import {ProfileService} from '../../../profile/services/profile.service';
import {PronosticModel} from '../../../profile/modules/favorites/models/pronostic.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {

  public competition: CompetitionModel;
  public matches: MatchModel[];
  public contest: ContestModel;
  public pronostics: PronosticModel[];
  public days: number[];
  public selectedDay: number;
  private unsubscribeAll: Subject<any>;

  constructor(public contestService: ContestService,
              private profileService: ProfileService,
              private matchesService: MatchesService) {
    this.unsubscribeAll = new Subject();
    this.pronostics = [];
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

    this.profileService.pronostics
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.pronostics = res;
        this.selectMatchDay(this.matchesService.selectedMatchDay.value);
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
        this.updateProno();
      })
      .catch(error => {
      });
  }

  public updateProno() {
    for (const pronostic of this.pronostics) {
      for (const match of this.matches) {
        if (pronostic.match.id === match.id) {
          match.result = pronostic.result;
        }
      }
    }
  }

}
