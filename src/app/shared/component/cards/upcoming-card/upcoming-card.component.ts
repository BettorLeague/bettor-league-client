import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatchModel} from '../../../model/football/match.model';
import {ProfileService} from '../../../../profile/services/profile.service';
import {PronosticModel} from '../../../../profile/modules/favorites/models/pronostic.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PronosticService} from '../../../../contest/modules/matches/modules/match/services/pronostic.service';
import {PronosticRequestModel} from '../../../../contest/modules/matches/modules/match/models/pronostic.model';

@Component({
  selector: ' app-upcoming-card',
  templateUrl: './upcoming-card.component.html',
  styleUrls: ['../card.component.scss']
})
export class UpcomingCardComponent implements OnInit, OnDestroy {

  @Input() match: MatchModel;
  @Input() contestId: number;

  public pronostic: PronosticModel;

  private unsubscribeAll: Subject<any>;

  constructor(private profileService: ProfileService,
              private pronosticService: PronosticService) {
    this.pronostic = null;
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.profileService.pronostics
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.pronostic = null;
        for (const pronostic of res) {
          if (pronostic.match.id === this.match.id) {
            this.pronostic = pronostic;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  prono(result: string) {
    this.pronosticService.makePronostic(this.contestId, new PronosticRequestModel(this.contestId, this.match.id, result));
  }

}
