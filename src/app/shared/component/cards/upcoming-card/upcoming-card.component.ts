import {Component, Input, OnInit} from '@angular/core';
import {MatchModel} from '../../../model/football/match.model';
import {ContestModel} from '../../../model/contest/contest.model';

@Component({
  selector: 'app-upcoming-card',
  templateUrl: './upcoming-card.component.html',
  styleUrls: ['../card.component.scss']
})
export class UpcomingCardComponent implements OnInit {

  @Input() match: MatchModel;
  @Input() contest: ContestModel;

  constructor() {
  }

  ngOnInit() {
  }

}
