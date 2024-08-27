import { TestBed } from '@angular/core/testing';

import { CarDealershipServiceService } from './car-dealership-service.service';

describe('CarDealershipServiceService', () => {
  let service: CarDealershipServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDealershipServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
