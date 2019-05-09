import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnnouncementComponent } from './post-announcement.component';

describe('PostAnnouncementComponent', () => {
  let component: PostAnnouncementComponent;
  let fixture: ComponentFixture<PostAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
