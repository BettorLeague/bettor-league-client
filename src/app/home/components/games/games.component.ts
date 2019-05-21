import {Component, Input, OnInit} from '@angular/core';
import {ContestModel} from '../../../shared/model/contest/contest.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  @Input() contest: ContestModel;

  constructor() {
  }

  ngOnInit() {
  }

}
