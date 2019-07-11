import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouMessageComponent } from './thank-you-message.component';

describe('ThankYouMessageComponent', () => {
  let component: ThankYouMessageComponent;
  let fixture: ComponentFixture<ThankYouMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankYouMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
