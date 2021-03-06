import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContestModel} from '../../../shared/model/contest/contest.model';
import {PlayerModel} from '../../../shared/model/contest/player.model';
import {Router} from '@angular/router';
import {ProfileService} from '../../../profile/services/profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {


  public contest: ContestModel;
  public player: PlayerModel;
  private unsubscribeAll: Subject<any>;

  constructor(private contestService: ContestService,
              private profileService: ProfileService,
              private router: Router) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.player
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.player = res;
      });
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

  contestSubscribe() {
    this.contestService.subscribeContest(this.contest.id).toPromise()
      .then(player => {
        this.contestService.player.next(player);
        this.contestService.getContest(this.contest.id).toPromise().then(res => {
          this.contestService.contest.next(res);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  contestUnSubscribe() {
    this.contestService.unSubscribeContest(this.contest.id).toPromise()
      .then(player => {
        this.contestService.player.next(null);
        this.contestService.getContest(this.contest.id).toPromise().then(res => {
          this.contestService.contest.next(res);
        });
        this.profileService.getPronostics();
        this.router.navigate(['/contest/' + this.contest.id]);
      })
      .catch(error => {
        console.log(error);
      });
  }

}
