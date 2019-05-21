import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenStorage} from './token.storage';
import {AuthenticationService} from './authentication.service';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {


  constructor(private tokenStorage: TokenStorage,
              private authService: AuthenticationService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone();

    if (this.tokenStorage.getToken()) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.tokenStorage.getToken()}`}
      });
    }

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.tokenStorage.removeToken();
        //this.authService.logout();
        //location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));

  }


}

