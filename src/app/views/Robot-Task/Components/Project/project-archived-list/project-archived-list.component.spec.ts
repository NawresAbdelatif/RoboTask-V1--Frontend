import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectArchivedListComponent } from './project-archived-list.component';

describe('ProjectArchivedListComponent', () => {
  let component: ProjectArchivedListComponent;
  let fixture: ComponentFixture<ProjectArchivedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectArchivedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectArchivedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
