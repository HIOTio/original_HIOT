import { TestBed, inject } from '@angular/core/testing';

import { DeploymentsUserService } from './deployments-user.service';

describe('DeploymentsUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeploymentsUserService]
    });
  });

  it('should be created', inject([DeploymentsUserService], (service: DeploymentsUserService) => {
    expect(service).toBeTruthy();
  }));
});
