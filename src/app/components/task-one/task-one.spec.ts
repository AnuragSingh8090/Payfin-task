import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOne } from './task-one';

describe('TaskOne', () => {
  let component: TaskOne;
  let fixture: ComponentFixture<TaskOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOne],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
