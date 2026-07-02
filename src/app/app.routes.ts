import { Routes } from '@angular/router';
import { TaskOne } from './components/task-one/task-one';
import { TaskTwo } from './components/task-two/task-two';

export const routes: Routes = [
  { path: '', component: TaskOne },
  { path: 'task2', component: TaskTwo },
];
