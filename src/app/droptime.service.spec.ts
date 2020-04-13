import { TestBed } from '@angular/core/testing';

import { DroptimeService } from './droptime.service';

describe('DroptimeService', () => {
  let service: DroptimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroptimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
