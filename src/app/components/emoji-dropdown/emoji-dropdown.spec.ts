import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiDropdown } from './emoji-dropdown';

describe('EmojiDropdown', () => {
  let component: EmojiDropdown;
  let fixture: ComponentFixture<EmojiDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(EmojiDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
