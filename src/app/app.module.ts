import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XrpDonationsModule } from '../../projects/xrp-donations/src/lib/xrp-donations.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    XrpDonationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
