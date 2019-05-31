import { Injectable } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

const rippleServer = 'wss://s2.ripple.com:443';

@Injectable({
  providedIn: 'root'
})
export class XrpDonationsService {

  private socket: WebSocket;
  private messages$: Subscription;
  socketData$: Subject<SocketData> = new Subject();

  constructor() {
  }

  connect() {
    this.socket = new WebSocket(rippleServer);

    fromEvent(this.socket, 'open')
      .pipe(
        take(1)
      )
      .subscribe(() => this.socketData$.next(
        {
          type: 'open'
        }
      ));

    fromEvent(this.socket, 'close')
      .pipe(
        take(1)
      )
      .subscribe(() => this.socketData$.next(
        {
          type: 'close'
        }
      ));

    this.messages$ = fromEvent(this.socket, 'message')
      .subscribe((message: MessageEvent) => {
        this.socketData$.next({
          type: 'message',
          data: JSON.parse(message.data)
        });
      });
    return this.socketData$;
  }

  getAccount(account: string) {
    this.socket.send(JSON.stringify({
      command: 'account_info',
      account,
      strict: true,
      ledger_index: 'validated'
    }));
  }

  disconnect() {
    this.messages$.unsubscribe();
  }

  watchAccount(account: string) {
    this.socket.send(JSON.stringify({
      command: 'subscribe',
      accounts: [account],
      streams: [
        'ledger'
      ]
    }));
  }

  ping() {
    const command = {
      command: 'ping'
    };
    this.socket.send(JSON.stringify(command));
  }
}

export enum ConnectionStatus {
  connected = 'Connected',
  disconnected = 'Disconnected'
}

export interface SocketData {
  type: string;
  data?: any;
}
