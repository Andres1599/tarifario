import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendamientosComponent } from './arrendamientos.component';

describe('ArrendamientosComponent', () => {
  let component: ArrendamientosComponent;
  let fixture: ComponentFixture<ArrendamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrendamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrendamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
