import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionArrendamientoComponent } from './impresion-arrendamiento.component';

describe('ImpresionArrendamientoComponent', () => {
  let component: ImpresionArrendamientoComponent;
  let fixture: ComponentFixture<ImpresionArrendamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpresionArrendamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpresionArrendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
