import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresDialogoComponent } from './proveedores-dialogo.component';

describe('ProveedoresDialogoComponent', () => {
  let component: ProveedoresDialogoComponent;
  let fixture: ComponentFixture<ProveedoresDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
