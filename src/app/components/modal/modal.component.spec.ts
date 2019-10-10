import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { NgbdModalContentComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: NgbdModalContentComponent;
  let fixture: ComponentFixture<NgbdModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
