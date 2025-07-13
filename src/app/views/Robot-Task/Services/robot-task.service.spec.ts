import { TestBed } from '@angular/core/testing';

import { RobotTaskService } from './robot-task.service';

describe('RobotTaskService', () => {
  let service: RobotTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
