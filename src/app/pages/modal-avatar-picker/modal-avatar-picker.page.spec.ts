import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvatarPickerPage } from './modal-avatar-picker.page';

describe('ModalAvatarPickerPage', () => {
  let component: ModalAvatarPickerPage;
  let fixture: ComponentFixture<ModalAvatarPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAvatarPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAvatarPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
