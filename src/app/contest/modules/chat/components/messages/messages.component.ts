import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {takeUntil} from 'rxjs/operators';
import {MessageModel} from '../../models/message.model';
import {AuthenticationService} from '../../../../../authentication/services/authentication.service';
import {UserModel} from '../../../../../authentication/models/user.model';
import {NgForm} from '@angular/forms';
import {ContestService} from '../../../../services/contest.service';
import {PlayerModel} from '../../../../../shared/model/contest/player.model';
import {MessageRequestModel} from '../../models/message-request.model';
import {ContestModel} from '../../../../../shared/model/contest/contest.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages: MessageModel[];
  public contest: ContestModel;
  public currentUser: UserModel;
  public player: PlayerModel;
  private unsubscribeAll: Subject<any>;

  @ViewChild('replyForm')
  replyForm: NgForm;


  @ViewChild('scrollMe')
  public myScrollContainer: ElementRef;

  constructor(private chatService: ChatService,
              private contestService: ContestService,
              public authService: AuthenticationService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.chatService.messages
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.messages = res;
        this.scrollToBottom();
      });

    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.currentUser = res;
      });

    this.contestService.player
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.player = res;
      });
    this.contestService.contest
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.contest = res;
      });
  }


  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  reply(event): void {

    event.preventDefault();

    if (!this.replyForm.form.value.message) {
      return;
    }

    const messageRequest = new MessageRequestModel(null, null);
    messageRequest.content = this.replyForm.form.value.message;
    messageRequest.playerId = this.player.id;

    this.replyForm.reset();

    this.chatService.sendMessage(messageRequest);
  }


  isFirstMessageOfGroup(message, i): boolean {
    return (i === 0 || this.messages[i - 1] && this.messages[i - 1].player.user.id !== message.player.user.id);
  }

  isLastMessageOfGroup(message: MessageModel, i): boolean {
    return (i === this.messages.length - 1 || this.messages[i + 1] && this.messages[i + 1].player.user.id !== message.player.user.id);
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }


}
