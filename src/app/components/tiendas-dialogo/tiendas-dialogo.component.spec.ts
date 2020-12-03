import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendasDialogoComponent } from './tiendas-dialogo.component';

describe('TiendasDialogoComponent', () => {
  let component: TiendasDialogoComponent;
  let fixture: ComponentFixture<TiendasDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendasDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendasDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
