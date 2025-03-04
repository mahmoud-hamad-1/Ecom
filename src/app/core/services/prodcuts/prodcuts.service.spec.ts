import { TestBed } from '@angular/core/testing';

import { ProdcutsService } from './prodcuts.service';

describe('ProdcutsService', () => {
  let service: ProdcutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
