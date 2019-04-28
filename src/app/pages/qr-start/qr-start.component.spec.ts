import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrStartComponent } from './qr-start.component';

describe('QrStartComponent', () => {
  let component: QrStartComponent;
  let fixture: ComponentFixture<QrStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
