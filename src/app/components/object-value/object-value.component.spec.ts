import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { ObjectValueComponent } from './object-value.component';

describe('ObjectValueComponent', () => {
  let component: ObjectValueComponent;
  let fixture: ComponentFixture<ObjectValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
