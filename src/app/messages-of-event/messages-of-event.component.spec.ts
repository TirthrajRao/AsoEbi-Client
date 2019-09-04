import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesOfEventComponent } from './messages-of-event.component';

describe('MessagesOfEventComponent', () => {
  let component: MessagesOfEventComponent;
  let fixture: ComponentFixture<MessagesOfEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesOfEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
