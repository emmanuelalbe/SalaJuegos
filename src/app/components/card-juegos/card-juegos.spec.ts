import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJuegos } from './card-juegos';

describe('CardJuegos', () => {
  let component: CardJuegos;
  let fixture: ComponentFixture<CardJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardJuegos],
    }).compileComponents();

    fixture = TestBed.createComponent(CardJuegos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
