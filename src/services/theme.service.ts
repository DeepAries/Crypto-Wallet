import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDark = signal<boolean>(false);

  constructor() {
    // Initialize theme based on saved preference or system default
    const savedTheme = localStorage.getItem('lumina-theme');
    if (savedTheme) {
      this.isDark.set(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDark.set(true);
    }

    // Effect to apply class and save preference
    effect(() => {
      const isDark = this.isDark();
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('lumina-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('lumina-theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.isDark.update(current => !current);
  }
}