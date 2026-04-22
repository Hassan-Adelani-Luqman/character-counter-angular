import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-input',
  imports: [],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInputComponent implements OnChanges {
  @Input() text = '';
  @Input() isOverLimit = false;
  @Output() textChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    // React when the over-limit state changes so the border updates immediately
    if (changes['isOverLimit']) {
      // Border styling is handled via class binding in the template
    }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.textChange.emit(target.value);
  }
}
