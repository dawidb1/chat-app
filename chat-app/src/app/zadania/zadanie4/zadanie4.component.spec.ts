import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie4Component } from './zadanie4.component';

describe('Zadanie4Component', () => {
  let component: Zadanie4Component;
  let fixture: ComponentFixture<Zadanie4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Zadanie4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Zadanie4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
