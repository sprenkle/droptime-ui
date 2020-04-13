import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimularComponent } from './timular.component';

describe('TimularComponent', () => {
  let component: TimularComponent;
  let fixture: ComponentFixture<TimularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
