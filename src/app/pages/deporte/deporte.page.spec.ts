import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeportePage } from './deporte.page';

describe('DeportePage', () => {
  let component: DeportePage;
  let fixture: ComponentFixture<DeportePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
