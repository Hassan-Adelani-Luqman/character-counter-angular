import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class ControlsComponent implements OnChanges {
  @Input() excludeSpaces = false;
  @Input() hasCharLimit = false;
  @Input() characterLimit = 500;
  @Input() readingTime = '';
  @Input() isOverLimit = false;

  @Output() excludeSpacesChange = new EventEmitter<boolean>();
  @Output() hasCharLimitChange = new EventEmitter<boolean>();
  @Output() characterLimitChange = new EventEmitter<number>();

  // Hover/focus state for each checkbox to drive the correct Figma SVG asset
  excludeSpacesHovered = false;
  excludeSpacesFocused = false;
  charLimitHovered = false;
  charLimitFocused = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOverLimit']) {
      // Warning visibility is driven by @if in the template
    }
  }

  getCheckboxSrc(checked: boolean, hovered: boolean, focused: boolean): string {
    const state = focused ? 'Focused' : hovered ? 'Hover' : 'Default';
    const checkedVal = checked ? 'True' : 'False';
    const filename = `Checked=${checkedVal}, State=${state}.svg`;
    return `/assets/checkboxes/${encodeURIComponent(filename)}`;
  }

  onExcludeSpacesChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.excludeSpacesChange.emit(target.checked);
  }

  onHasCharLimitChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.hasCharLimitChange.emit(target.checked);
  }

  onCharacterLimitInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    if (!isNaN(value) && value > 0) {
      this.characterLimitChange.emit(value);
    }
  }
}
