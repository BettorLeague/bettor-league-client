import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RegisterRequestModel} from '../models/register.request.model';
import {LoginRequestModel} from '../models/login.request.model';
import {UserModel} from '../models/user.model';
import {TokenStorage} from './token.storage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: BehaviorSubject<UserModel>;
  private baseUrl = environment.backUrl + '/api/v1';

  constructor(private http: HttpClient,
              private router: Router,
              private tokenStorage: TokenStorage) {
    this.currentUser = new BehaviorSubject(null);
  }

  public attemptSignIn(loginRequest: LoginRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/login', loginRequest);
  }

  public attemptSignUp(registerRequest: RegisterRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/register', registerRequest);
  }

  public initUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/auth/me').subscribe((response: any) => {
        this.currentUser.next(response);
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        this.tokenStorage.removeToken();
        this.router.navigate(['auth']);
        this.currentUser.next(null);
      } else {
        reject('Not logged');
      }
    });
  }
}
