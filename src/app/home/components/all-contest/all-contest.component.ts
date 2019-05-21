import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {ContestModel} from '../../../shared/model/contest/contest.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PaginationModel} from '../../../shared/model/pagination/pagination.model';

@Component({
  selector: 'app-all-contest',
  templateUrl: './all-contest.component.html',
  styleUrls: ['./all-contest.component.scss']
})
export class AllContestComponent implements OnInit, OnDestroy {

  public allContest: ContestModel[];

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
