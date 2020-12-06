import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesTiendaBuscadorComponent } from './materiales-tienda-buscador.component';

describe('MaterialesTiendaBuscadorComponent', () => {
  let component: MaterialesTiendaBuscadorComponent;
  let fixture: ComponentFixture<MaterialesTiendaBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesTiendaBuscadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesTiendaBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
