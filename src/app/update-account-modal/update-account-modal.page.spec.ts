import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAccountModalPage } from './update-account-modal.page';

describe('UpdateAccountModalPage', () => {
  let component: UpdateAccountModalPage;
  let fixture: ComponentFixture<UpdateAccountModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
