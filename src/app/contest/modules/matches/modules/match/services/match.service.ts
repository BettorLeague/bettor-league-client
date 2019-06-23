import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatchModel} from '../../../../../../shared/model/football/match.model';
import {environment} from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService implements Resolve<any> {

  public match: BehaviorSubject<MatchModel>;
  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient,
              private router: Router) {
    this.match = new BehaviorSubject(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getMatch(route.params['id']).toPromise()
        .then(match => {
          this.match.next(match);
          resolve(match);
        })
        .catch(error => {
          this.router.navigate(['error/not-found']);
          reject(error);
        });
    });
  }

  public getMatch(matchId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'match/' + matchId);
  }
}
