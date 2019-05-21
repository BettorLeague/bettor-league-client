import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContestModel} from '../../../shared/model/contest/contest.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {


  public contest: ContestModel;
  private unsubscribeAll: Subject<any>;

  constructor(private contestService: ContestService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.contest
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.contest = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
