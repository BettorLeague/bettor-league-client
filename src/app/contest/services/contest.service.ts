import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {MatDrawer} from '@angular/material';
import {SnackBarService} from '../../shared/service/snack-bar.service';
import {SnackBarType} from '../../shared/model/snack-bar.type';
import {StandingModel} from '../models/standing.model';
import {PlayerStandingModel} from '../models/player-standing.model';
import {CompetitionModel} from '../../shared/model/football/competition.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService implements Resolve<any> {

  public startDrawer: MatDrawer;
  public endDrawer: MatDrawer;

  public contest: BehaviorSubject<any>;
  public competition: BehaviorSubject<CompetitionModel>;
  public teams: BehaviorSubject<any[]>;
  public standings: BehaviorSubject<StandingModel[]>;
  public playerStanding: BehaviorSubject<PlayerStandingModel[]>;
  public matches: BehaviorSubject<any[]>;
  public player: BehaviorSubject<any>;
  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient,
              private snackService: SnackBarService,
              private router: Router) {
    this.contest = new BehaviorSubject([]);
    this.competition = new BehaviorSubject(null);
    this.teams = new BehaviorSubject([]);
    this.standings = new BehaviorSubject([]);
    this.matches = new BehaviorSubject([]);
    this.player = new BehaviorSubject(null);
    this.playerStanding = new BehaviorSubject([]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.getContest(route.params['id']).toPromise()
        .then(contest => {
          this.contest.next(contest);
          Promise.all([
            this.getCompetition(contest.competition.id).toPromise(),
            this.getTeams(contest.competition.id).toPromise(),
            this.getStandings(contest.competition.id).toPromise()
          ])
            .then(([competition, teams, standings]) => {
              this.competition.next(competition);
              this.teams.next(teams);
              this.standings.next(standings);
              resolve();
            })
            .catch(error => {
              this.snackService.show(SnackBarType.error, error);
              reject(error);
            });
        })
        .catch(error => {
          this.router.navigate(['error/not-found']);
          reject(error);
        });
    });
  }


  public getContest(contestId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'contest/' + contestId);
  }

  public subscribeContest(contestId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'user/contest/' + contestId, null);
  }

  public unSubscribeContest(contestId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'user/contest/' + contestId);
  }

  public getCompetition(competitionId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'competition/' + competitionId);
  }

  public getTeams(competitionId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'competition/' + competitionId + '/teams');
  }

  public getStandings(competitionId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'competition/' + competitionId + '/standings');
  }

  public getMatches(competitionId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'competition/' + competitionId + '/matches');
  }

  public getPlayer(contestId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'user/contest/' + contestId + '/player');
  }
}

