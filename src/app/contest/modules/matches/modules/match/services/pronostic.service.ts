import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {PronosticRequestModel} from '../models/pronostic.model';
import {ProfileService} from '../../../../../../profile/services/profile.service';
import {SnackBarService} from '../../../../../../shared/service/snack-bar.service';
import {SnackBarType} from '../../../../../../shared/model/snack-bar.type';

@Injectable({
  providedIn: 'root'
})
export class PronosticService {

  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient,
              private snackService: SnackBarService,
              private profileService: ProfileService) {
  }

  public makePronostic(contestId: number, pronosticRequestModel: PronosticRequestModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}user/contest/${contestId}/pronostic?matchId=${pronosticRequestModel.matchId}&result=${pronosticRequestModel.result}`, {})
        .subscribe(
          res => {
            this.profileService.getPronostics();
            resolve(res);
          }, error => {
            this.snackService.show(SnackBarType.error, error);
            reject(error);
          });

    });
  }
}
