import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTiendaComponent } from './material-tienda.component';

describe('MaterialTiendaComponent', () => {
  let component: MaterialTiendaComponent;
  let fixture: ComponentFixture<MaterialTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
