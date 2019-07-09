import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionStartPage } from './session-start.page';

describe('SessionStartPage', () => {
  let component: SessionStartPage;
  let fixture: ComponentFixture<SessionStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionStartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
