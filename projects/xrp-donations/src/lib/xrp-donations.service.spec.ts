import { TestBed, inject } from '@angular/core/testing';

import { XrpDonationsService } from './xrp-donations.service';

describe('XrpDonationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XrpDonationsService]
    });
  });

  it('should be created', inject([XrpDonationsService], (service: XrpDonationsService) => {
    expect(service).toBeTruthy();
  }));
});
