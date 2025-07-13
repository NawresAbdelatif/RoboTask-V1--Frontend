import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotTaskComponent } from './robot-task.component';

describe('RobotTaskComponent', () => {
  let component: RobotTaskComponent;
  let fixture: ComponentFixture<RobotTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
