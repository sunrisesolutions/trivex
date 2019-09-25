import { TestBed } from '@angular/core/testing';

import { UpdateProfilePictureService } from './update-profile-picture.service';

describe('UpdateProfilePictureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateProfilePictureService = TestBed.get(UpdateProfilePictureService);
    expect(service).toBeTruthy();
  });
});
