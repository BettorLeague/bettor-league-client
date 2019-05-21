import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestModel} from '../../../shared/model/contest/contest.model';
import {TeamModel} from '../../../shared/model/football/team.model';
import {Subject} from 'rxjs';
import {HomeService} from '../../services/home.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public topContests: ContestModel[];
  public topTeams: TeamModel[];
  private unsubscribeAll: Subject<any>;

  constructor(public homeService: HomeService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.homeService.topContests
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.topContests = res;
      });

    this.homeService.topTeams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.topTeams = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public openDrawer(drawerView: string): void {

    if (this.homeService.endDrawer.opened) {
      this.closeDrawer().then(() => {
        this.homeService.drawerView = drawerView;
        this.homeService.endDrawer.open();
      });
    } else {
      this.homeService.drawerView = drawerView;
      this.homeService.endDrawer.open();
    }
  }

  public closeDrawer(): Promise<any> {
    return this.homeService.endDrawer.close()
      .then(() => {
        this.homeService.drawerView = null;
      });
  }

}
