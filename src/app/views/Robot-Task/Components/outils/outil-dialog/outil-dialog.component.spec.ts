import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilDialogComponent } from './outil-dialog.component';

describe('OutilDialogComponent', () => {
  let component: OutilDialogComponent;
  let fixture: ComponentFixture<OutilDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutilDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
