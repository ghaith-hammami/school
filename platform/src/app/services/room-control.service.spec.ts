import { TestBed } from '@angular/core/testing';

import { RoomControlService } from './room-control.service';

describe('RoomControlService', () => {
  let service: RoomControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
