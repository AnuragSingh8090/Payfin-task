import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  imports: [],
  templateUrl: './custom-dropdown.html',
  styleUrl: './custom-dropdown.css',
})
export class CustomDropdown {
  showDropdown:boolean = false;
  
  handleClick():void{
    this.showDropdown = !this.showDropdown;
  }

}
