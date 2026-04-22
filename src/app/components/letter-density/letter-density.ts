import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-letter-density',
  imports: [],
  templateUrl: './letter-density.html',
  styleUrl: './letter-density.css',
})
export class LetterDensityComponent implements OnInit, OnChanges, OnDestroy {
  @Input() letterDensity: { letter: string; count: number; percentage: number }[] = [];

  showAll = false;

  get visibleLetters() {
    return this.showAll ? this.letterDensity : this.letterDensity.slice(0, 5);
  }

  get maxCount(): number {
    return this.letterDensity.length > 0 ? this.letterDensity[0].count : 1;
  }

  ngOnInit(): void {
    this.showAll = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['letterDensity']) {
      const current = changes['letterDensity'].currentValue;
      if (!current || current.length === 0) {
        this.showAll = false;
      }
    }
  }

  ngOnDestroy(): void {
    // Cleanup — component is being removed from the DOM
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  barWidth(count: number): number {
    return (count / this.maxCount) * 100;
  }
}
