import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {ContestService} from './services/contest.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  @ViewChild('contestStartDrawer') startDrawer: MatDrawer;

  constructor(private contestService: ContestService) {
  }

  ngOnInit() {
    this.contestService.startDrawer = this.startDrawer;
  }

}
