import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ParameterListBlockComponent} from './parameter-list-block.component';

describe('ParameterListBlockComponent', () => {
  let component: ParameterListBlockComponent;
  let fixture: ComponentFixture<ParameterListBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterListBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterListBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
