import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContestModel } from 'src/app/shared/model/contest/contest.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileBarService {
  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient) {}

  public getUserContests(): Observable<any> {
    return this.http.get(`${this.baseUrl}user/contests`);
  }

}
