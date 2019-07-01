import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SnackBarService} from '../../../../shared/service/snack-bar.service';
import {SnackBarType} from '../../../../shared/model/snack-bar.type';
import {PronosticModel} from '../models/pronostic.model';
import {ProfileService} from '../../../services/profile.service';

@Injectable()
export class MyPronosticsService implements Resolve<any> {


  public pronostics: BehaviorSubject<PronosticModel[]>;
  public pastMatch: BehaviorSubject<PronosticModel[]>;
  public liveMatch: BehaviorSubject<PronosticModel[]>;
  public comingMatch: BehaviorSubject<PronosticModel[]>;
  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient,
              private profileService: ProfileService,
              private snackService: SnackBarService) {
    this.pronostics = new BehaviorSubject([]);

    this.pastMatch = new BehaviorSubject([]);
    this.liveMatch = new BehaviorSubject([]);
    this.comingMatch = new BehaviorSubject([]);

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.profileService.pronostics.subscribe(
        pronostics => {
        this.pronostics.next(pronostics);
        const past = [];
        const coming = [];
        const live = [];
        for (const pronostic of pronostics as PronosticModel[]) {
          if (pronostic.match.status === 'SCHEDULED') {
            coming.push(pronostic);
          } else if (pronostic.match.status === 'IN_PLAY') {
            live.push(pronostic);
          } else if (pronostic.match.status === 'FINISHED') {
            past.push(pronostic);
          }
        }
        this.liveMatch.next(live);
        this.pastMatch.next(past);
        this.comingMatch.next(coming);
        resolve(pronostics);
      },
        error => {
          reject(error);
          this.snackService.show(SnackBarType.error, error);
        });
    });
  }


}
