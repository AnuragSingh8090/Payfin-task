import { Component } from '@angular/core';
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

  onDropdownToggle(dropdownId: string | null): void {
    this.activeDropdownId = dropdownId;
  }
}
