import {Component, OnInit} from '@angular/core';
import {MyAnimations} from '../../../shared/animation';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
  animations: MyAnimations
})
export class ContestsComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }


}
