import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy {


  constructor(private chatService:ChatService) {
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.chatService.wsDisconnect();
  }


}
