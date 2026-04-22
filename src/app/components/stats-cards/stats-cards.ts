import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stats-cards',
  imports: [],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
})
export class StatsCardsComponent implements OnChanges {
  @Input() charCount = 0;
  @Input() wordCount = 0;
  @Input() sentenceCount = 0;
  @Input() excludeSpaces = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Triggered whenever a count input changes — useful for animation or logging
    if (changes['charCount'] || changes['wordCount'] || changes['sentenceCount']) {
      // Counts updated; template will re-render with new values
    }
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
