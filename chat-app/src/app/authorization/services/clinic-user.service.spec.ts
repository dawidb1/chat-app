import { TestBed } from '@angular/core/testing';

import { ClinicUserService } from './clinic-user.service';

describe('ClinicUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicUserService = TestBed.get(ClinicUserService);
    expect(service).toBeTruthy();
  });
});
