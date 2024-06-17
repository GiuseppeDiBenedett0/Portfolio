import { TestBed } from '@angular/core/testing';

import { NavigateByButtonService } from './navigate.service';

describe('NavigateByButtonService', () => {
  let service: NavigateByButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateByButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
