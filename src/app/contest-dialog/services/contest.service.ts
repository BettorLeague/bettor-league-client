import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContestRequestModel } from '../models/contest.model';

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
    return this.http.post(`${this.baseUrl}/contest`, contestRequest);
  }

}

