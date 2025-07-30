import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousAssemblageDialogComponent } from './sous-assemblage-dialog.component';

describe('SousAssemblageDialogComponent', () => {
  let component: SousAssemblageDialogComponent;
  let fixture: ComponentFixture<SousAssemblageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousAssemblageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousAssemblageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
