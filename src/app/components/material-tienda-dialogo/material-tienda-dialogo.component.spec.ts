import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTiendaDialogoComponent } from './material-tienda-dialogo.component';

describe('MaterialTiendaDialogoComponent', () => {
  let component: MaterialTiendaDialogoComponent;
  let fixture: ComponentFixture<MaterialTiendaDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTiendaDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTiendaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
