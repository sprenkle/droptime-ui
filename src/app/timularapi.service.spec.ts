import { TestBed } from '@angular/core/testing';

import { TimularapiService } from './timularapi.service';

describe('TimularapiService', () => {
  let service: TimularapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimularapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
