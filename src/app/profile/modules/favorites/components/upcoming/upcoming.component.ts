import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PronosticModel} from '../../models/pronostic.model';
import {ProfileService} from '../../../../services/profile.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['../../column.component.scss']
})
export class UpcomingComponent implements OnInit, OnDestroy {
  public pronostics: PronosticModel[];
  private unsubscribeAll: Subject<any>;

  constructor(private profileService: ProfileService) {
    this.unsubscribeAll = new Subject();
    this.pronostics = [];
  }

  ngOnInit() {
    this.profileService.pronostics
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.pronostics = [];
        for (const pronostic of res as PronosticModel[]) {
          if (pronostic.match.status === 'SCHEDULED') {
            this.pronostics.push(pronostic);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
