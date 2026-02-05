import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, Routes } from '@angular/router';

import { OnboardingComponent } from './src/components/onboarding/onboarding.component';
import { HomeComponent } from './src/components/home/home.component';
import { WalletComponent } from './src/components/wallet/wallet.component';
import { SwapComponent } from './src/components/swap/swap.component';
import { ActivityComponent } from './src/components/activity/activity.component';
import { AnalyticsComponent } from './src/components/analytics/analytics.component';
import { SettingsComponent } from './src/components/settings/settings.component';
import { TransactionDetailComponent } from './src/components/activity/transaction-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: OnboardingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'swap', component: SwapComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'activity/:id', component: TransactionDetailComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'settings', component: SettingsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation())
  ]
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.