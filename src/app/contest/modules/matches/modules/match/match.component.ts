import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatchModel} from 'src/app/shared/model/football/match.model';
import {MatchService} from './services/match.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PronosticService} from './services/pronostic.service';
import {PronosticRequestModel} from './models/pronostic.model';
import {ContestService} from 'src/app/contest/services/contest.service';
import {SnackBarService} from 'src/app/shared/service/snack-bar.service';
import {SnackBarType} from 'src/app/shared/model/snack-bar.type';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {
  public match: MatchModel;
  public timer: Object;
  private unsubscribeAll: Subject<any>;
  public interval: any;
  private contestId: number;
  public isPronoExist = false;
  public pronoResult: string;

  constructor(
    private matchService: MatchService,
    private pronosticService: PronosticService,
    private contestService: ContestService,
    private snackBarService: SnackBarService) {
    this.unsubscribeAll = new Subject();
    this.isPronoExist = false;
  }

  ngOnInit() {
    this.matchService.match
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.match = res;
      });

    if (this.match.status === 'SCHEDULED') {
      this.initTimer();
      this.interval = setInterval(() => this.initTimer(), 1000);
    }

    this.contestService.pronostics
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(pronos => {
        if (pronos.length > 0) {
          pronos.forEach(prono => {
            if (prono.match.id === this.match.id) {
              this.isPronoExist = true;
              this.pronoResult = prono.result;
              return;
            }
          });
        }
      });
  }

  ngOnDestroy() {
    this.timer = null;
    clearInterval(this.interval);
  }

  initTimer() {
    const matchTime = this.match.utcDate;
    const currentDate = new Date().getTime();
    const timeToMatch = new Date(matchTime).getTime() - currentDate;

    let days: number, hours: number, minutes: number, seconds: number;
    seconds = Math.floor(timeToMatch / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    days = Math.floor(hours / 24);
    hours = hours % 24;

    this.timer = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  makeProno(result: string) {
    this.contestService.contest.subscribe(contest => {
      this.contestId = contest.id;
    });
    const pronoRequestModel = new PronosticRequestModel(this.contestId, this.match.id, result);
    this.pronosticService.makePronostic(this.contestId, pronoRequestModel)
      .then(res => {
        this.isPronoExist = true;
        this.pronoResult = res.result;
        this.contestService.getPronostics(this.contestId).toPromise()
          .then(pronostics => {
            this.contestService.pronostics.next(pronostics);
          });
        this.snackBarService.show(SnackBarType.success, `You have succesfuly voted: ${result}`);
      })
      .catch(error => {
        this.snackBarService.show(SnackBarType.error, error);
      });
  }
}
