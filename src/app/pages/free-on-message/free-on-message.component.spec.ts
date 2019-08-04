import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeOnMessageComponent } from './free-on-message.component';

describe('FreeOnMessageComponent', () => {
  let component: FreeOnMessageComponent;
  let fixture: ComponentFixture<FreeOnMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeOnMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeOnMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
