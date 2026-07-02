import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  imports: [],
  templateUrl: './custom-dropdown.html',
  styleUrl: './custom-dropdown.css',
})
export class CustomDropdown {
  @Input() dropdownId: string | null = null;
  @Input() isOpen = false;
  @Output() dropdownToggled = new EventEmitter<string | null>();

  showDropdown = false;

  ngOnChanges(): void {
    this.showDropdown = this.isOpen;

  }

  parent : any;

  handleClick(event: MouseEvent): void {

    event.stopPropagation();

    this.functionResetAllIndex()
    if (this.showDropdown) {
      this.showDropdown = false;
      this.dropdownToggled.emit(null);
      return;
    }

    this.showDropdown = true;
    this.dropdownToggled.emit(this.dropdownId);

 this.parent = (event.target as HTMLElement)
  .parentElement
  ?.parentElement
  ?.parentElement as HTMLElement;

this.parent.style.zIndex ="10";

  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    if (!target?.closest('.dropdown-shell')) {
      this.showDropdown = false;
      
      this.dropdownToggled.emit(null);
       this.functionResetAllIndex()

    }
  }

  functionResetAllIndex(){
      const allParent = document.querySelectorAll('.popup-container')
      allParent.forEach((eachElem)=>{
        const elem = eachElem as HTMLElement
        elem.style.zIndex = "1"
      })
  }
}
