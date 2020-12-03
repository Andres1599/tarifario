import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedasDialogoComponent } from './monedas-dialogo.component';

describe('MonedasDialogoComponent', () => {
  let component: MonedasDialogoComponent;
  let fixture: ComponentFixture<MonedasDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonedasDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonedasDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
