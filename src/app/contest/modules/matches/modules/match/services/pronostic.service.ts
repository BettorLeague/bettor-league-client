import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { PronosticRequestModel } from '../models/pronostic.model';

@Injectable({
  providedIn: 'root'
})
export class PronosticService {

  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient) {}

  public makePronostic(contestId: number, pronosticRequestModel: PronosticRequestModel): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.baseUrl}user/contest/${contestId}/pronostic?matchId=${pronosticRequestModel.matchId}&result=${pronosticRequestModel.result}`, {});
  }
}
