import {Injectable} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {PronosticModel} from '../modules/favorites/models/pronostic.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {StatsModel} from '../modules/dashboard/models/stats.model';
import {ContestModel} from '../../shared/model/contest/contest.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Resolve<any> {

  drawer: MatDrawer;

  public pronostics: BehaviorSubject<PronosticModel[]>;
  public stats: BehaviorSubject<StatsModel>;
  public contests: BehaviorSubject<ContestModel[]>;
  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient) {
    this.pronostics = new BehaviorSubject([]);
    this.contests = new BehaviorSubject([]);
    this.stats = new BehaviorSubject(null);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getPronostics(),
        this.getContests(),
        this.getStats().toPromise()
      ])
        .then(([pronostics, contests, stats]) => {
          this.stats.next(stats);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getPronostics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + 'user/pronostics').toPromise()
        .then(res => {
          this.pronostics.next(res as PronosticModel[]);
          this.getStats().toPromise().then(stats => {
            this.stats.next(stats);
          });
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getStats(): Observable<any> {
    return this.http.get(this.baseUrl + 'user/stats');
  }

  public getContests(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get(this.baseUrl + 'user/contests').toPromise()
        .then(contests => {
          this.contests.next(contests as ContestModel[]);
          resolve(contests);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
