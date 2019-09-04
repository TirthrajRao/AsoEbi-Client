import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationEventComponent } from './invitation-event.component';

describe('InvitationEventComponent', () => {
  let component: InvitationEventComponent;
  let fixture: ComponentFixture<InvitationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
