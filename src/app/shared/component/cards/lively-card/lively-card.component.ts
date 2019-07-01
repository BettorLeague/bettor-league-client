import {Component, Input, OnInit} from '@angular/core';
import {MatchModel} from '../../../model/football/match.model';

@Component({
  selector: 'app-lively-card',
  templateUrl: './lively-card.component.html',
  styleUrls: ['../card.component.scss']
})
export class LivelyCardComponent implements OnInit {

  @Input() match: MatchModel;
  @Input() contestId: number;

  constructor() {
  }

  ngOnInit() {
  }

}
