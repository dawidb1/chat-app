import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie5Component } from './zadanie5.component';

describe('Zadanie5Component', () => {
  let component: Zadanie5Component;
  let fixture: ComponentFixture<Zadanie5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Zadanie5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Zadanie5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
