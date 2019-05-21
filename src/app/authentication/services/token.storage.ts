import {Injectable} from '@angular/core';


const TOKEN_KEY = 'BETTOR_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {


  constructor() {
  }

  public removeToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
  }

  public saveToken(token: string, rememberMe: boolean) {
    this.removeToken();
    if (rememberMe) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) ? sessionStorage.getItem(TOKEN_KEY) : localStorage.getItem(TOKEN_KEY);
  }
}
