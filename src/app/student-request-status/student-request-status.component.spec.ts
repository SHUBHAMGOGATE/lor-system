import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestStatusComponent } from './student-request-status.component';

describe('StudentRequestStatusComponent', () => {
  let component: StudentRequestStatusComponent;
  let fixture: ComponentFixture<StudentRequestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRequestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
