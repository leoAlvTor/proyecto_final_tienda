import { TestBed } from '@angular/core/testing';

import { IniciosesionService } from './iniciosesion.service';

describe('IniciosesionService', () => {
  let service: IniciosesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciosesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
