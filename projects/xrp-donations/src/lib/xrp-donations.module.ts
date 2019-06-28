import { NgModule } from '@angular/core';
import { XrpDonationsComponent } from './xrp-donations.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [XrpDonationsComponent],
  exports: [XrpDonationsComponent]
})
export class XrpDonationsModule { }
