import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GasFilterComponent} from './gas-filter.component';

describe('GasFilterComponent', () => {
  let component: GasFilterComponent;
  let fixture: ComponentFixture<GasFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
