import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const rippleServer = 'wss://s2.ripple.com:443';

@Injectable({
  providedIn: 'root'
})
export class XrpDonationsService {

  socket: Subject<any>;
  openObserver: Subject<Event> = new Subject<Event>();

  constructor() {
  }

  connect() {
    return this.socket = webSocket({
      url: rippleServer,
      openObserver: this.openObserver
    });
  }

  getAccount(account: string) {
    this.socket.next({
      command: 'account_info',
      account,
      strict: true,
      ledger_index: 'validated'
    });
  }

  watchAccount(account: string) {
    this.socket.next({
      command: 'subscribe',
      accounts: [account],
      streams: [
        'ledger'
      ]
    });
  }

  ping() {
    const command = {
      command: 'ping'
    };
    this.socket.next(command);
  }
}

export enum ConnectionStatus {
  connected = 'Connected',
  disconnected = 'Disconnected'
}
