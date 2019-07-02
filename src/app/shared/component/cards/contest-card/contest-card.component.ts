import {Component, Input, OnInit} from '@angular/core';
import {ContestModel} from '../../../model/contest/contest.model';
import {ContestService} from '../../../../contest/services/contest.service';
import {ProfileService} from '../../../../profile/services/profile.service';

@Component({
  selector: 'app-contest-card',
  templateUrl: './contest-card.component.html',
  styleUrls: ['../card.component.scss']
})
export class ContestCardComponent implements OnInit {

  @Input() contest: ContestModel;

  constructor(private contestService: ContestService,
              public profileService: ProfileService) {
  }

  ngOnInit() {
  }

  unsubscribeFromContest (contestId: number, contestType: string) {
    this.contestService.unSubscribeContest(contestId).subscribe(res => {
      this.profileService.getContests();
    });
  }

}
