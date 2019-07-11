import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEventComponent } from './guest-event.component';

describe('GuestEventComponent', () => {
  let component: GuestEventComponent;
  let fixture: ComponentFixture<GuestEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
