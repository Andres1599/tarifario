import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMaterialComponent } from './tipo-material.component';

describe('TipoMaterialComponent', () => {
  let component: TipoMaterialComponent;
  let fixture: ComponentFixture<TipoMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
