import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private themeService = inject(ThemeService); // Initialize theme service

  // Track the current URL reactively
  currentUrl = signal('');

  ngOnInit() {
    // Initialize with current URL
    this.currentUrl.set(this.router.url);

    // Subscribe to navigation events to update the signal
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Use urlAfterRedirects to handle the initial redirect from '' to 'welcome'
      this.currentUrl.set(event.urlAfterRedirects ?? event.url);
    });
  }

  // Hide nav on onboarding screens (welcome, login, etc.)
  showNav = computed(() => {
    const url = this.currentUrl();
    // Exclude welcome screen and root path
    return !['/welcome', '/'].includes(url) && !url.startsWith('/welcome');
  });
}