import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ContestService} from '../../../services/contest.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {MatchModel} from '../../../../shared/model/football/match.model';

@Injectable()
export class MatchesService implements Resolve<any> {

  public matches: BehaviorSubject<MatchModel[]>;
  public selectedMatchDay : BehaviorSubject<number>;
    private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient,
              private contestService: ContestService) {
    this.matches = new BehaviorSubject([]);
    this.selectedMatchDay = new BehaviorSubject(null);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.contestService.competition.subscribe(res => {
        this.getMatches(res.id, res.currentSeason.currentMatchday).toPromise()
          .then(matches => {
            this.matches.next(matches);
            this.selectedMatchDay.next(res.currentSeason.currentMatchday);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }

  public getMatches(competitionId: number, matchDay: number): Observable<any> {
    return this.http.get(this.baseUrl + 'competition/' + competitionId + '/matches?matchday=' + matchDay);
  }
}
