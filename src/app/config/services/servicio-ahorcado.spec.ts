import { TestBed } from '@angular/core/testing';

import { ServicioAhorcado } from './servicio-ahorcado';

describe('ServicioAhorcado', () => {
  let service: ServicioAhorcado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAhorcado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
