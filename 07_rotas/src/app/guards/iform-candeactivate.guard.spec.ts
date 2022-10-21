import { TestBed } from '@angular/core/testing';

import { IformCandeactivateGuard } from './iform-candeactivate.guard';

describe('IformCandeactivateGuard', () => {
  let guard: IformCandeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IformCandeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
