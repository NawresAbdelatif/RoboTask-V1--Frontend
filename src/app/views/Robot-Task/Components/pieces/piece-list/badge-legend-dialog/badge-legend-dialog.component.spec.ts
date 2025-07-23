import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeLegendDialogComponent } from './badge-legend-dialog.component';

describe('BadgeLegendDialogComponent', () => {
  let component: BadgeLegendDialogComponent;
  let fixture: ComponentFixture<BadgeLegendDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeLegendDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeLegendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
