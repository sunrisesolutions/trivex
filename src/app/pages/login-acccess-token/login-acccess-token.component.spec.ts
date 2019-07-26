import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAcccessTokenComponent } from './login-acccess-token.component';

describe('LoginAcccessTokenComponent', () => {
  let component: LoginAcccessTokenComponent;
  let fixture: ComponentFixture<LoginAcccessTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAcccessTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAcccessTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
