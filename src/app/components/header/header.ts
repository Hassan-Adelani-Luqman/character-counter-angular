import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  @Input() isDarkTheme = true;
  @Output() themeToggle = new EventEmitter<void>();

  ngOnInit(): void {
    // Component initialized — header ready to display
  }

  onToggleTheme(): void {
    this.themeToggle.emit();
  }
}
