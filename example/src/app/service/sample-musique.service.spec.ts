import { TestBed } from '@angular/core/testing';

import { SampleMusiqueService } from './sample-musique.service';

describe('SampleMusiqueService', () => {
  let service: SampleMusiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleMusiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
