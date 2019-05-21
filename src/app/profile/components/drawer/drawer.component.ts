import {Component, OnInit} from '@angular/core';
import {MyAnimations} from '../../../shared/animation';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {UserModel} from '../../../authentication/models/user.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: MyAnimations
})
export class DrawerComponent implements OnInit {
  user: UserModel;

  private unsubscribeAll: Subject<any>;

  constructor(private authService: AuthenticationService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.user = res;
      });
  }

  logout() {
    this.authService.logout();
  }


}
