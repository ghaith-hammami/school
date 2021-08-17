import { TestBed } from '@angular/core/testing';

import { WebsiteThemeService } from './website-theme.service';

describe('WebsiteThemeService', () => {
  let service: WebsiteThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
