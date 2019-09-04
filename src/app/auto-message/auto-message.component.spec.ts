import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMessageComponent } from './auto-message.component';

describe('AutoMessageComponent', () => {
  let component: AutoMessageComponent;
  let fixture: ComponentFixture<AutoMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
