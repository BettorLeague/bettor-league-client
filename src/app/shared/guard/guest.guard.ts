import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(): boolean {
    if (this.authService.currentUser.value) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }
}
