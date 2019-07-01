import {Component, OnInit} from '@angular/core';
import {MyAnimations} from '../../../shared/animation';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: MyAnimations
})
export class FavoritesComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }


}
