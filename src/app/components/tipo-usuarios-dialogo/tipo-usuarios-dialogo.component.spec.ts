import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuariosDialogoComponent } from './tipo-usuarios-dialogo.component';

describe('TipoUsuariosDialogoComponent', () => {
  let component: TipoUsuariosDialogoComponent;
  let fixture: ComponentFixture<TipoUsuariosDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoUsuariosDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUsuariosDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
