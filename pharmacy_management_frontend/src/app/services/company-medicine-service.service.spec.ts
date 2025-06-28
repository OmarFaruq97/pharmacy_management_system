import { TestBed } from '@angular/core/testing';

import { CompanyMedicineServiceService } from './company-medicine-service.service';

describe('CompanyMedicineServiceService', () => {
  let service: CompanyMedicineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyMedicineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
