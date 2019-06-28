import { Component } from '@angular/core';
import { XrpDonationsConfig } from '../../projects/xrp-donations/src/lib/xrp-donations.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  noBalanceConfig: XrpDonationsConfig = {
    showBalance: false
  };

  noQRConfig: XrpDonationsConfig = {
    showQRCode: false
  };
}
