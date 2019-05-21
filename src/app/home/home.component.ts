import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HomeService} from './services/home.service';
import {MatDrawer} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthenticationService} from '../authentication/services/authentication.service';
import {ContestModel} from '../shared/model/contest/contest.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('homeStartDrawer') startDrawer: MatDrawer;
  @ViewChild('homeEndDrawer') endDrawer: MatDrawer;

  public contests: ContestModel[];
  public drawerView: string;
  private unsubscribeAll: Subject<any>;

  constructor(public homeService: HomeService,
              public authService: AuthenticationService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.homeService.startDrawer = this.startDrawer;
    this.homeService.endDrawer = this.endDrawer;

    this.homeService.topContests
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.contests = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
