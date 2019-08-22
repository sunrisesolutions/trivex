import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageApprovalComponent } from './message-approval.component';

describe('MessageApprovalComponent', () => {
  let component: MessageApprovalComponent;
  let fixture: ComponentFixture<MessageApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
