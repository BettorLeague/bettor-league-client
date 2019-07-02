import {Component, OnInit} from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {PlayerStandingModel} from '../../models/player-standing.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public standing: PlayerStandingModel[];
  private unsubscribeAll: Subject<any>;

  constructor(private contestService: ContestService) {
    this.unsubscribeAll = new Subject();
    this.standing = [];
  }

  ngOnInit() {
    this.getPlayersStanding();
  }

  getPlayersStanding() {
    this.contestService.playerStanding
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(res => {
          this.standing = res;
        });
  }
}
