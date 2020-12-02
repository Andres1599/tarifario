import { TestBed } from '@angular/core/testing';

import { AuthOnGuard } from './auth-on.guard';

describe('AuthOnGuard', () => {
  let guard: AuthOnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
