import { TestBed } from '@angular/core/testing';

import { LbService } from './lb.service';

describe('LbService', () => {
  let service: LbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
