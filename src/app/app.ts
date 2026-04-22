import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { TextInputComponent } from './components/text-input/text-input';
import { ControlsComponent } from './components/controls/controls';
import { StatsCardsComponent } from './components/stats-cards/stats-cards';
import { LetterDensityComponent } from './components/letter-density/letter-density';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    TextInputComponent,
    ControlsComponent,
    StatsCardsComponent,
    LetterDensityComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  text = '';
  excludeSpaces = false;
  hasCharLimit = false;
  characterLimit = 500;
  isDarkTheme = true;

  get charCount(): number {
    return this.excludeSpaces
      ? this.text.replace(/\s/g, '').length
      : this.text.length;
  }

  get wordCount(): number {
    return this.text.trim() ? this.text.trim().split(/\s+/).length : 0;
  }

  get sentenceCount(): number {
    return this.text.trim()
      ? this.text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
  }

  get readingTime(): string {
    if (this.wordCount === 0) return '0 minute';
    const minutes = Math.ceil(this.wordCount / 200);
    if (minutes < 1) return '< 1 minute';
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }

  get isOverLimit(): boolean {
    return this.hasCharLimit && this.charCount > this.characterLimit;
  }

  get letterDensity(): { letter: string; count: number; percentage: number }[] {
    const letters = this.text.toLowerCase().replace(/[^a-z]/g, '');
    if (!letters.length) return [];

    const freq: Record<string, number> = {};
    for (const ch of letters) {
      freq[ch] = (freq[ch] ?? 0) + 1;
    }

    return Object.entries(freq)
      .map(([letter, count]) => ({
        letter: letter.toUpperCase(),
        count,
        percentage: (count / letters.length) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }

  ngOnInit(): void {
    // Dark is default — no class needed; ensure .light is absent on fresh load
    document.documentElement.classList.remove('light');
  }

  onTextChange(value: string): void {
    this.text = value;
  }

  onExcludeSpacesChange(value: boolean): void {
    this.excludeSpaces = value;
  }

  onHasCharLimitChange(value: boolean): void {
    this.hasCharLimit = value;
  }

  onCharacterLimitChange(value: number): void {
    this.characterLimit = value;
  }

  onThemeToggle(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('light', !this.isDarkTheme);
  }
}
