import { TestBed } from '@angular/core/testing';

import { YahooService } from './yahoo.service';

describe('YahooService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YahooService = TestBed.get(YahooService);
    expect(service).toBeTruthy();
  });
});
