import { TestBed } from '@angular/core/testing';

import { SettokenService } from './settoken.service';

describe('SettokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettokenService = TestBed.get(SettokenService);
    expect(service).toBeTruthy();
  });
});
