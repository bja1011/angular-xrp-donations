## XRP Donations 
Simple Angular 6+ XRP donations component.

### How to use
Import XRPDonationsModule.

Use component on your app:
`<ngx-xrp-donations wallet='wallet_address''></ngx-xrp-donations>`

### Demo
https://bja1011.github.io/angular-xrp-donations/
 
### Config
You can configure which elements to show or pass custom class to style the component.
```
interface XrpDonationsConfig {
  showBalance?: boolean;
  showAccount?: boolean;
  showQRCode?: boolean;
  containerClass?: string;
  showConnectionStatus?: boolean;
}
```

Just pass your config object:

```
myConfig: XrpDonationsConfig = {
  showBalance: true,
  showAccount: false,
  showQRCode: true,
  containerClass: 'my-custom-class',
  showConnectionStatus: false
};
```
`<bja-xrp-donations [config]="myConfig" account="account"></bja-xrp-donations>`

All boolean properties are optional and true as default. 

