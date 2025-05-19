import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipamientosPage } from './equipamientos.page';

describe('EquipamientosPage', () => {
  let component: EquipamientosPage;
  let fixture: ComponentFixture<EquipamientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
