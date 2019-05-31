import { Component, Input, OnInit } from '@angular/core';
import { ConnectionStatus, XrpDonationsService } from './xrp-donations.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'xrp-donations',
  template: `
    {{balance ? balance + 'XRP' : '-'}} <br>{{status}}
  `,
  styles: []
})
export class XrpDonationsComponent implements OnInit {

  @Input() account: string;
  balance: number;
  status: ConnectionStatus = ConnectionStatus.disconnected;

  constructor(private xrpDonationsService: XrpDonationsService,
  ) {
    xrpDonationsService.connect()
      .subscribe(msg => {
        console.log(msg);
        this.handleSocketResponse(msg);
      });

    xrpDonationsService.openObserver
      .pipe(
        take(1)
      )
      .subscribe((event) => {
        this.status = ConnectionStatus.connected;
        // xrpDonationsService.watchAccount(this.account);
        xrpDonationsService.getAccount(this.account);
      });
  }

  ngOnInit() {
  }

  private handleSocketResponse(msg: any) {
    const accountData = msg.result.account_data;
    if (accountData) {
      this.balance = accountData.Balance / 1000000;
    }
  }
}

