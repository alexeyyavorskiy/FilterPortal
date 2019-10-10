import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {I18DatepickerComponent} from './i18-datepicker.component';

describe('I18DatepickerComponent', () => {
  let component: I18DatepickerComponent;
  let fixture: ComponentFixture<I18DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18DatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
