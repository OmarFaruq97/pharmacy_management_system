import { TestBed } from '@angular/core/testing';

import { NewGenericService } from './new-generic.service';

describe('NewGenericService', () => {
  let service: NewGenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
