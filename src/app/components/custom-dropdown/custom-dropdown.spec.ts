import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropdown } from './custom-dropdown';

describe('CustomDropdown', () => {
  let component: CustomDropdown;
  let fixture: ComponentFixture<CustomDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when opening and close when clicking outside', () => {
    const emitSpy = spyOn(component.dropdownToggled, 'emit');
    component.dropdownId = 'field-1';

    component.handleClick(new MouseEvent('click'));
    expect(component.showDropdown).toBeTrue();
    expect(emitSpy).toHaveBeenCalledWith('field-1');

    component.handleOutsideClick({ target: document.body } as MouseEvent);
    expect(component.showDropdown).toBeFalse();
    expect(emitSpy).toHaveBeenCalledWith(null);
  });
});
