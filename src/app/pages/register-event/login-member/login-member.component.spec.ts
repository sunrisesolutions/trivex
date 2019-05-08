import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMemberComponent } from './login-member.component';

describe('LoginMemberComponent', () => {
  let component: LoginMemberComponent;
  let fixture: ComponentFixture<LoginMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
