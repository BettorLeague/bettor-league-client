import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestModel} from 'src/app/shared/model/contest/contest.model';
import {MyAnimations} from '../../../shared/animation';
import {ContestService} from '../../../contest/services/contest.service';
import {SnackBarService} from '../../../shared/service/snack-bar.service';
import {SnackBarType} from '../../../shared/model/snack-bar.type';
import {ProfileService} from '../../services/profile.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
