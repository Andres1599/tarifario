import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaDialogoComponent } from './advertencia-dialogo.component';

describe('AdvertenciaDialogoComponent', () => {
  let component: AdvertenciaDialogoComponent;
  let fixture: ComponentFixture<AdvertenciaDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertenciaDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertenciaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
