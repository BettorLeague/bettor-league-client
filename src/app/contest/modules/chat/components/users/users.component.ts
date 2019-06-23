import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {takeUntil} from 'rxjs/operators';
import {PlayerModel} from '../../../../../shared/model/contest/player.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public searchText: string;
  public players: PlayerModel[];

  private unsubscribeAll: Subject<any>;

  constructor(private chatService: ChatService) {
    this.searchText = '';

    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.chatService.onlinePlayer
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.players = res;
      });
  }

}
