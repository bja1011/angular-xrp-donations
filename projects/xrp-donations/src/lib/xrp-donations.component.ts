import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConnectionStatus, SocketData, XrpDonationsService} from './xrp-donations.service';
import {Subscription} from 'rxjs';
import * as QR from './qrc';

@Component({
  selector: 'bja-xrp-donations',
  template: `
    <img [src]='qrCodeImage'><br>{{account}}<br>
    {{balance ? balance + 'XRP' : '-'}} <br>{{status}}
  `,
  styles: []
})
export class XrpDonationsComponent implements OnDestroy, OnInit{

  @Input() account: string;
  balance: number;
  status: ConnectionStatus = ConnectionStatus.disconnected;
  connection: Subscription;
  qrCodeImage: string;

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
    const result = data.result;
    if (result && result.account_data) {
      this.balance = result.account_data.Balance / 1000000;
    }
  }

  ngOnDestroy(): void {
    this.connection.unsubscribe();
    this.xrpDonationsService.disconnect();
  }

  ngOnInit(): void {
    this.qrCodeImage = QR.createQRCode(this.account);
  }
}

