import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XrpDonationsComponent } from './xrp-donations.component';

describe('XrpDonationsComponent', () => {
  let component: XrpDonationsComponent;
  let fixture: ComponentFixture<XrpDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XrpDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XrpDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
