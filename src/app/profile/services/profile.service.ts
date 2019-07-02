import {Injectable} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {PronosticModel} from '../modules/favorites/models/pronostic.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { ContestModel } from 'src/app/shared/model/contest/contest.model';
import { SnackBarService } from 'src/app/shared/service/snack-bar.service';
import { SnackBarType } from 'src/app/shared/model/snack-bar.type';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Resolve<any> {

  drawer: MatDrawer;
  private baseUrl = environment.backUrl + '/api/v1/';
  public contests: BehaviorSubject<ContestModel[]>;
  public pronostics: BehaviorSubject<PronosticModel[]>;

  constructor(private http: HttpClient, private snackService: SnackBarService) {
    this.pronostics = new BehaviorSubject([]);
    this.contests = new BehaviorSubject([]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getPronostics().toPromise(),
        this.getUserContests().toPromise()
      ]).then(([pronostics, contests]) => {
            this.pronostics.next(pronostics as PronosticModel[]);
            this.contests.next(contests);
            resolve();
          })
          .catch(error => {
            this.snackService.show(SnackBarType.error, error);
            reject(error);
          });
    });
  }

  public getPronostics(): Observable<any> {
    return this.http.get(this.baseUrl + 'user/pronostics');
  }

  public getUserContests(): Observable<any> {
    return this.http.get(`${this.baseUrl}user/contests`);
  }
}
