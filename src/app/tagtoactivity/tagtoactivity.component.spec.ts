import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagtoactivityComponent } from './tagtoactivity.component';

describe('TagtoactivityComponent', () => {
  let component: TagtoactivityComponent;
  let fixture: ComponentFixture<TagtoactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagtoactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagtoactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
