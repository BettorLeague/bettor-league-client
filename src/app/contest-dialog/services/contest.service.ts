import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContestRequestModel } from '../models/contest.model';
import { ContestModel } from '../../shared/model/contest/contest.model';

@Injectable()
export class ContestService {
  public competitions: BehaviorSubject<any>;

  private baseUrl = environment.backUrl + '/api/v1';

  constructor(
    private http: HttpClient,
  ) {}

  public getCompetitions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/competition`);
  }

  public createPrivateContest(contestRequest: ContestRequestModel): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const route = `${this.baseUrl}/contest?caption=${contestRequest.caption}&competitionId=${contestRequest.competitionId}&type=${contestRequest.type}`;
    return this.http.post(route, {});
  }
}
