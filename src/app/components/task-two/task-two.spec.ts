import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTwo } from './task-two';

describe('TaskTwo', () => {
  let component: TaskTwo;
  let fixture: ComponentFixture<TaskTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTwo],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
