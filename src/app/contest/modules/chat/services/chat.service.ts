import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {ContestService} from '../../../services/contest.service';
import * as stompjs from 'stompjs';
import {Client} from 'stompjs';
import {AuthenticationService} from '../../../../authentication/services/authentication.service';
import {MessageModel} from '../models/message.model';
import {MessageRequestModel} from '../models/message-request.model';
import * as SockJS from 'sockjs-client';
import {PlayerModel} from '../../../../shared/model/contest/player.model';
import {SnackBarService} from '../../../../shared/service/snack-bar.service';
import {SnackBarType} from '../../../../shared/model/snack-bar.type';

@Injectable()
export class ChatService implements Resolve<any> {

  public stompClient: Client;
  public messages: BehaviorSubject<MessageModel[]>;
  public onlinePlayer: BehaviorSubject<PlayerModel[]>;
  private baseUrl = environment.backUrl + '/api/v1/';
  private baseUrlSocket = environment.backUrl;

  constructor(private http: HttpClient,
              private contestService: ContestService,
              private snackService: SnackBarService,
              private authService: AuthenticationService,
              private router: Router) {
    this.messages = new BehaviorSubject([]);
    this.onlinePlayer = new BehaviorSubject([]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      this.contestService.getPlayer(route.root.firstChild.params['id']).toPromise()
        .then(player => {
          this.contestService.player.next(player);
          this.getMessages(route.root.firstChild.params['id'], 0, null, null, null).toPromise()
            .then(res => {
              this.messages.next(res.content);
              const socket = new SockJS(this.baseUrlSocket + '/ws') as WebSocket;
              this.stompClient = stompjs.over(socket);
              this.stompClient.debug = null;
              this.stompClient.connect(
                {},
                connected => {
                  this.stompClient.subscribe('/topic/chat/' + this.contestService.contest.value.id + '/participants', participants => {
                    this.onlinePlayer.next(JSON.parse(participants.body));
                  });

                  this.stompClient.send('/app/chat/login',
                    {},
                    JSON.stringify(new MessageRequestModel(null, this.contestService.player.value.id))
                  );

                  this.stompClient.subscribe('/topic/chat/' + this.contestService.contest.value.id + '/messages', messages => {
                    const buffer = this.messages.value;
                    buffer.push(JSON.parse(messages.body));
                    this.messages.next(buffer);
                  });

                  resolve();
                },
                error => {
                  console.log(error);
                });

            })
            .catch(error => {
              resolve(error);
              console.log(error);
            });
        })
        .catch(error => {
          this.snackService.show(SnackBarType.error, error);
          this.router.navigate(['/contest/' + route.root.firstChild.params['id']]);
          reject(error);
        });


    });

  }

  public getMessages(contestId: number, pageNumber: number, pageSize: number, sort: string, sortDirection: string): Observable<any> {
    return this.http.get(this.baseUrl + 'contest/' + contestId + '/messages'
      + (pageNumber || pageNumber === 0 ? '?page=' + pageNumber : '')
      + (pageSize ? '&size=' + pageSize : '')
      + (sort ? '&sort=' + sort : '')
      + (sortDirection ? '&sortDirection=' + sortDirection : ''));
  }

  public postMessage(playerId: number, messageRequest: MessageRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + 'player/' + playerId + '/messages', messageRequest);
  }

  public wsDisconnect(): void {
    this.stompClient.disconnect(() => {

    });
  }

  public sendMessage(messageRequest: MessageRequestModel) {
    this.stompClient.send('/app/chat/' + this.contestService.contest.value.id + '/messages',
      {},
      JSON.stringify(messageRequest)
    );
  }


}

