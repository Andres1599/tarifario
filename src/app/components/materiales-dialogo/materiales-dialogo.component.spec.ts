import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesDialogoComponent } from './materiales-dialogo.component';

describe('MaterialesDialogoComponent', () => {
  let component: MaterialesDialogoComponent;
  let fixture: ComponentFixture<MaterialesDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
