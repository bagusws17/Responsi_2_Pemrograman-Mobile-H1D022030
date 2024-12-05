import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainanPage } from './mainan.page';

describe('MainanPage', () => {
  let component: MainanPage;
  let fixture: ComponentFixture<MainanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
