import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEventsComponent } from './total-events.component';

describe('TotalEventsComponent', () => {
  let component: TotalEventsComponent;
  let fixture: ComponentFixture<TotalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
