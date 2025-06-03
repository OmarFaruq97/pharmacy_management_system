import { TestBed } from '@angular/core/testing';

import { MedicineNameService } from './medicine-name.service';

describe('MedicineNameService', () => {
  let service: MedicineNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
