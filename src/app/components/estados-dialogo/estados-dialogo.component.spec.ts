import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosDialogoComponent } from './estados-dialogo.component';

describe('EstadosDialogoComponent', () => {
  let component: EstadosDialogoComponent;
  let fixture: ComponentFixture<EstadosDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
