import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {ProfileService} from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.drawer = this.drawer;
  }

}
