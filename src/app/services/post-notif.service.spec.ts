import { TestBed } from '@angular/core/testing';

import { PostNotifService } from './post-notif.service';

describe('PostNotifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostNotifService = TestBed.get(PostNotifService);
    expect(service).toBeTruthy();
  });
});
