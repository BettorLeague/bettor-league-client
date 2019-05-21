import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {HomeService} from '../../services/home.service';
import {TeamModel} from '../../../shared/model/football/team.model';

@Component({
  selector: 'app-all-team',
  templateUrl: './all-team.component.html',
  styleUrls: ['./all-team.component.scss']
})
export class AllTeamComponent implements OnInit, OnDestroy {

  public allTeam: TeamModel[];

  private unsubscribeAll: Subject<any>;

  constructor(private homeService: HomeService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  closeDrawer() {
    this.homeService.endDrawer.close().then(() => {
      this.homeService.drawerView = null;
    });
  }

}
