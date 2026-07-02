import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomDropdown } from '../custom-dropdown/custom-dropdown';
import { EmojiDropdown } from '../emoji-dropdown/emoji-dropdown';

@Component({
  selector: 'app-task-one',
  imports: [CustomDropdown, EmojiDropdown],
  templateUrl: './task-one.html',
  styleUrl: './task-one.css',
})
export class TaskOne {
  activeDropdownId: string | null = null;

  constructor(private router: Router) {}

  onDropdownToggle(dropdownId: string | null): void {
    this.activeDropdownId = dropdownId;
  }

  goToTaskTwo(): void {
    this.router.navigate(['/task2']);
  }
}
