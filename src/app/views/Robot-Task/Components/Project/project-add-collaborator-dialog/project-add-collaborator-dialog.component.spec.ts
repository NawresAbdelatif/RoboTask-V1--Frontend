import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddCollaboratorDialogComponent } from './project-add-collaborator-dialog.component';

describe('ProjectAddCollaboratorDialogComponent', () => {
  let component: ProjectAddCollaboratorDialogComponent;
  let fixture: ComponentFixture<ProjectAddCollaboratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAddCollaboratorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAddCollaboratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
