import {Injectable} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {PronosticModel} from '../modules/favorites/models/pronostic.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Resolve<any> {

  drawer: MatDrawer;

  public pronostics: BehaviorSubject<PronosticModel[]>;
  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient) {
    this.pronostics = new BehaviorSubject([]);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.getPronostics().then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  public getPronostics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + 'user/pronostics').toPromise()
          .then(res => {
            this.pronostics.next(res as PronosticModel[]);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
    });
  }
}
