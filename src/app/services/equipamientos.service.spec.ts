import { TestBed } from '@angular/core/testing';

import { EquipamientosService } from './equipamientos.service';

describe('EquipamientosService', () => {
  let service: EquipamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
