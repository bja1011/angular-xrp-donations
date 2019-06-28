import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConnectionStatus, SocketData, XrpDonationsService } from './xrp-donations.service';
import { Subscription } from 'rxjs';
import * as QR from './qrc';
import { XrpDonationsConfig } from './xrp-donations.interfaces';

const defaultConfig: XrpDonationsConfig = {
  showAccount: true,
  showQRCode: true,
  showBalance: true,
  containerClass: 'bja-xrp-donations-container',
};

@Component({
  selector: 'bja-xrp-donations',
  templateUrl: './xrp-donations.component.html',
  styleUrls: ['./xrp-donations.component.scss'],
  providers: [XrpDonationsService]
})
export class XrpDonationsComponent implements OnDestroy, OnInit {

  userConfig: XrpDonationsConfig = defaultConfig;
  @Input() account: string;

  @Input()
  set config(userConfig: XrpDonationsConfig) {
    this.userConfig = {
      ...defaultConfig,
      ...userConfig,
    };
  }

  balance: number;
  status: ConnectionStatus = ConnectionStatus.connecting;
  connection: Subscription;
  qrCodeImage: string;

  constructor(private xrpDonationsService: XrpDonationsService,
  ) {
    this.connection = this.xrpDonationsService.connect()
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

