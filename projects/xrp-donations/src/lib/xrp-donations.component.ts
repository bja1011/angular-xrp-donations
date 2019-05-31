import { Component, Input, OnDestroy } from '@angular/core';
import { ConnectionStatus, SocketData, XrpDonationsService } from './xrp-donations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'xrp-donations',
  template: `
    {{balance ? balance + 'XRP' : '-'}} <br>{{status}}
  `,
  styles: []
})
export class XrpDonationsComponent implements OnDestroy {

  @Input() account: string;
  balance: number;
  status: ConnectionStatus = ConnectionStatus.disconnected;
  connection: Subscription;

  constructor(private xrpDonationsService: XrpDonationsService,
  ) {

    this.connection = xrpDonationsService.connect()
      .subscribe(event => {
        this.handleSocketData(event);
      });
  }

  private handleSocketData(socketData: SocketData) {
    switch (socketData.type) {
      case 'open':
        this.status = ConnectionStatus.connected;
        this.xrpDonationsService.getAccount(this.account);
        this.xrpDonationsService.watchAccount(this.account);
        break;

      case 'close':
        this.status = ConnectionStatus.disconnected;
        break;

      case 'message':
        this.handleMessageType(socketData.data);
        break;
    }
  }

  private handleMessageType(data: any) {
    console.log(data)
    const result = data.result;
    if (result && result.account_data) {
      this.balance = result.account_data.Balance / 1000000;
    }
  }

  ngOnDestroy(): void {
    this.connection.unsubscribe();
    this.xrpDonationsService.disconnect();
  }
}

