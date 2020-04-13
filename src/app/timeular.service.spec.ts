import { TestBed } from '@angular/core/testing';

import { TimeularService } from './timeular.service';

describe('TimeularService', () => {
  let service: TimeularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
