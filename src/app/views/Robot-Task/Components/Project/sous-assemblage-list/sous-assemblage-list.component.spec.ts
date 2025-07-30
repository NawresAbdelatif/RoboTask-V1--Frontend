import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousAssemblageListComponent } from './sous-assemblage-list.component';

describe('SousAssemblageListComponent', () => {
  let component: SousAssemblageListComponent;
  let fixture: ComponentFixture<SousAssemblageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousAssemblageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousAssemblageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
