import { TestBed, inject } from '@angular/core/testing';

import { DeploymentUsersService } from './deployment-users.service';

describe('DeploymentUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeploymentUsersService]
    });
  });

  it('should be created', inject([DeploymentUsersService], (service: DeploymentUsersService) => {
    expect(service).toBeTruthy();
  }));
});
