import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DiagramBlockComponent } from './diagram-block.component';

describe('DiagramBlockComponent', () => {
  let component: DiagramBlockComponent;
  let fixture: ComponentFixture<DiagramBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
