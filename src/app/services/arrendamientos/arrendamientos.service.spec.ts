import { TestBed } from '@angular/core/testing';

import { ArrendamientosService } from './arrendamientos.service';

describe('ArrendamientosService', () => {
  let service: ArrendamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrendamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
