import {Component, Input, OnInit} from '@angular/core';
import {MatchModel} from '../../../model/football/match.model';

@Component({
  selector: 'app-past-card',
  templateUrl: './past-card.component.html',
  styleUrls: ['../card.component.scss']
})
export class PastCardComponent implements OnInit {

  @Input() match: MatchModel;
  @Input() contestId: number;

  constructor() { }

  ngOnInit() {
  }

}
