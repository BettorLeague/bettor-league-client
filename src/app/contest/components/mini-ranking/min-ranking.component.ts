import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContestService} from '../../services/contest.service';
import {StandingModel} from '../../models/standing.model';

@Component({
  selector: 'app-min-ranking',
  templateUrl: './min-ranking.component.html',
  styleUrls: ['./min-ranking.component.scss']
})
export class MinRankingComponent implements OnInit, OnDestroy {

  private standing: StandingModel;
  private unsubscribeAll: Subject<any>;

  constructor(public contestService: ContestService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.standings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        res.forEach(standing => {
          if (standing.type === 'TOTAL'){
            this.standing = standing;
          }
        });
      });
  }


  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
