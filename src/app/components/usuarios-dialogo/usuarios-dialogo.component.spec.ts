import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDialogoComponent } from './usuarios-dialogo.component';

describe('UsuariosDialogoComponent', () => {
  let component: UsuariosDialogoComponent;
  let fixture: ComponentFixture<UsuariosDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
