import { TestBed } from '@angular/core/testing';

import { Usergithub } from './usergithub';

describe('Usergithub', () => {
  let service: Usergithub;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usergithub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
