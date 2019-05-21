import { Component, OnInit } from '@angular/core';
import {MyAnimations} from "../../../shared/animation";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations : MyAnimations
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
