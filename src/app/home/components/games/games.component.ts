import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ContestModel} from '../../../shared/model/contest/contest.model';
import {DragScrollComponent} from 'ngx-drag-scroll';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  @Input() contest: ContestModel;
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor() {
  }

  ngOnInit() {
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

}
