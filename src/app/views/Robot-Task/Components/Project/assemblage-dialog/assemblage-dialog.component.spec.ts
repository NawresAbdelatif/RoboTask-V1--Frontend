import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblageDialogComponent } from './assemblage-dialog.component';

describe('AssemblageDialogComponent', () => {
  let component: AssemblageDialogComponent;
  let fixture: ComponentFixture<AssemblageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssemblageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
