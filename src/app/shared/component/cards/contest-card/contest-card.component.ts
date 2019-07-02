import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ContestModel } from '../../../model/contest/contest.model';

@Component({
  selector: 'app-contest-card',
  templateUrl: './contest-card.component.html',
  styleUrls: ['../card.component.scss']
})
export class ContestCardComponent implements OnInit {

  @Input() contest: ContestModel;
  @Output() onUnsubscribe: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  unsubscribeFromContest (contestId: number, contestType: string) {
    this.onUnsubscribe.emit({id: contestId, type: contestType});
  }

}
