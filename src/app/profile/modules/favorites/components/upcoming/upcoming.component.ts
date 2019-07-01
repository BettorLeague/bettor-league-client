import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {HomeService} from '../../../../../home/services/home.service';
import {AuthenticationService} from '../../../../../authentication/services/authentication.service';
import {takeUntil} from 'rxjs/operators';
import {MyPronosticsService} from '../../services/my-pronostics.service';
import {PronosticModel} from '../../models/pronostic.model';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['../../column.component.scss']
})
export class UpcomingComponent implements OnInit, OnDestroy {
  public pronostics: PronosticModel[];
  private unsubscribeAll: Subject<any>;

  constructor(private myPronoService: MyPronosticsService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.myPronoService.comingMatch
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.pronostics = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
