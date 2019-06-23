import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {ContestService} from './services/contest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  @ViewChild('contestStartDrawer') startDrawer: MatDrawer;

  constructor(public contestService: ContestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contestService.startDrawer = this.startDrawer;

    this.route.params.subscribe(params => {
      this.contestService.getPlayer(params['id']).toPromise()
        .then(player => {
          this.contestService.player.next(player);
        })
        .catch(error => {
          this.contestService.player.next(null);
        });
    });
  }

}
