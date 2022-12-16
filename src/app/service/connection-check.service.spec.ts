/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectionCheckService } from './connection-check.service';

describe('Service: ConnectionCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionCheckService]
    });
  });

  it('should ...', inject([ConnectionCheckService], (service: ConnectionCheckService) => {
    expect(service).toBeTruthy();
  }));
});
