import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskOne } from './components/task-one/task-one';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskOne],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
