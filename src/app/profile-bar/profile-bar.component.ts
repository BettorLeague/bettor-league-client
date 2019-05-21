import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/services/authentication.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit {

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
