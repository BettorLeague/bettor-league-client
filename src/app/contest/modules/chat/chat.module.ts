import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {RouterModule, Routes} from '@angular/router';
import {ChatService} from './services/chat.service';
import {SharedModule} from '../../../shared/shared.module';
import { MessagesComponent } from './components/messages/messages.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    resolve: {
      parent: ChatService
    },
  }
];

@NgModule({
  declarations: [ChatComponent, MessagesComponent, UsersComponent, UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
