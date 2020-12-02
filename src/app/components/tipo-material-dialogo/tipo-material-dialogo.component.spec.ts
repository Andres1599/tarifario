import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMaterialDialogoComponent } from './tipo-material-dialogo.component';

describe('TipoMaterialDialogoComponent', () => {
  let component: TipoMaterialDialogoComponent;
  let fixture: ComponentFixture<TipoMaterialDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMaterialDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMaterialDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
