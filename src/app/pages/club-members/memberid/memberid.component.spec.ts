import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberidComponent } from './memberid.component';

describe('MemberidComponent', () => {
  let component: MemberidComponent;
  let fixture: ComponentFixture<MemberidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
