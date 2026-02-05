import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { FormsModule } from '@angular/forms';

type Step = 'welcome' | 'create' | 'biometric' | 'seed' | 'confirm' | 'import';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center p-6 bg-[#F2F5F4] dark:bg-stone-950 transition-colors duration-300">
       <div class="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-xl shadow-stone-200/50 dark:shadow-none p-6 pt-12 relative overflow-hidden min-h-[600px] flex flex-col border border-stone-100 dark:border-stone-800">
          
          <!-- Header / Back Button -->
          @if (step() !== 'welcome') {
            <button (click)="goBack()" [disabled]="isLoading()" class="absolute top-8 left-8 z-20 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors bg-stone-50 dark:bg-stone-800 p-2 rounded-full disabled:opacity-50 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          }

          @if (step() === 'welcome') {
            <div class="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
              <div class="w-64 h-64 bg-gradient-to-tr from-[#ECFDF5] to-[#F2F5F4] dark:from-stone-800 dark:to-stone-900 rounded-full flex items-center justify-center mb-10 shadow-inner">
                 <div class="w-32 h-32 text-[#059669] dark:text-[#10B981]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 </div>
              </div>
              <h1 class="text-3xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight">Secure Your Future</h1>
              <p class="text-stone-500 dark:text-stone-400 mb-12 max-w-xs leading-relaxed">The most trusted way to store, send, and receive digital assets securely.</p>
              
              <button (click)="setStep('create')" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all mb-4">
                Create New Wallet
              </button>
              <button (click)="setStep('import')" class="w-full text-[#059669] dark:text-[#10B981] font-medium py-3 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-2xl transition-colors">I already have a wallet</button>
            </div>
          }

          @if (step() === 'create') {
            <div class="flex-1 pt-8 animate-fade-in relative">
              @if(isLoading()) {
                <div class="absolute inset-0 bg-white/50 dark:bg-stone-900/50 z-50 flex items-center justify-center backdrop-blur-sm rounded-xl">
                    <div class="flex flex-col items-center gap-3">
                        <svg class="animate-spin h-8 w-8 text-[#059669] dark:text-[#10B981]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Signing in...</span>
                    </div>
                </div>
              }

              <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-2">Create Account</h2>
              <p class="text-stone-500 dark:text-stone-400 mb-8">Sign up to start your crypto journey.</p>
              
              <div class="bg-stone-100 dark:bg-stone-800 p-1 rounded-xl flex mb-6">
                 <button (click)="signupMethod.set('email')"
                         [class]="signupMethod() === 'email' ? 'bg-white dark:bg-stone-700 shadow-sm text-stone-800 dark:text-stone-200' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'"
                         class="flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200">Email</button>
                 <button (click)="signupMethod.set('phone')"
                         [class]="signupMethod() === 'phone' ? 'bg-white dark:bg-stone-700 shadow-sm text-stone-800 dark:text-stone-200' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'"
                         class="flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200">Phone</button>
              </div>

              <div class="space-y-4">
                <div>
                   <label class="block text-xs font-semibold text-[#059669] dark:text-[#10B981] mb-1">
                      {{ signupMethod() === 'email' ? 'Email Address' : 'Phone Number' }}
                   </label>
                   @if (signupMethod() === 'email') {
                      <input type="email" [(ngModel)]="email" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#059669] dark:focus:ring-[#10B981] bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all animate-fade-in" placeholder="name@example.com" />
                   } @else {
                      <input type="tel" [(ngModel)]="phone" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#059669] dark:focus:ring-[#10B981] bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all animate-fade-in" placeholder="+1 (555) 000-0000" />
                   }
                </div>
                <div>
                   <label class="block text-xs font-semibold text-[#059669] dark:text-[#10B981] mb-1">Password</label>
                   <div class="relative">
                     <input type="password" [(ngModel)]="password" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#059669] dark:focus:ring-[#10B981] bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all" />
                     <span class="absolute right-4 top-3 text-stone-400 cursor-pointer hover:text-stone-600 dark:hover:text-stone-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                     </span>
                   </div>
                </div>
              </div>

              <div class="flex items-start gap-3 mt-6">
                 <input type="checkbox" class="mt-1 w-4 h-4 text-[#059669] dark:text-[#10B981] rounded focus:ring-[#059669] dark:focus:ring-[#10B981] border-gray-300 dark:border-stone-600 dark:bg-stone-800" />
                 <p class="text-xs text-stone-500 dark:text-stone-400 leading-tight">I agree to the <span class="text-[#059669] dark:text-[#10B981] underline cursor-pointer">Terms & Conditions</span> and <span class="text-[#059669] dark:text-[#10B981] underline cursor-pointer">Privacy Policy</span>.</p>
              </div>

              <div class="mt-8">
                <button (click)="setStep('biometric')" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Continue
                </button>
              </div>

              <div class="mt-8 flex items-center gap-4 text-xs text-stone-400 dark:text-stone-500">
                 <div class="h-px bg-stone-200 dark:bg-stone-700 flex-1"></div>
                 <span>Or sign up with</span>
                 <div class="h-px bg-stone-200 dark:bg-stone-700 flex-1"></div>
              </div>

              <div class="flex gap-4 justify-center mt-6">
                 <button (click)="socialSignup('google')" class="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors text-stone-800 dark:text-stone-200 hover:scale-110 active:scale-95 duration-200" title="Sign up with Google">
                    <span class="font-bold text-lg">G</span>
                 </button>
                 <button (click)="socialSignup('apple')" class="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors text-stone-800 dark:text-stone-200 hover:scale-110 active:scale-95 duration-200" title="Sign up with Apple">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.418 1.54-1.03 2.775-.978 2.93 1.258.117 2.66-.595 3.32-1.391.815-.99.568-2.618.513-2.673-.016-.016-.035-.034-.055-.034-.43-.004-.49-.004-.475-.004zM8.38 3.525c-2.31 0-3.328 1.488-3.328 1.488-.04.053-1.666 2.502-1.666 5.253 0 2.628 1.638 4.606 1.638 4.606.074.093 1.104 1.346 2.213 1.346 1.05 0 1.22-.596 2.766-.596 1.524 0 1.83.616 2.766.616 1.13 0 2.296-1.558 2.296-1.558.055-.075 1.597-2.316 1.597-4.665 0-2.388-1.578-3.64-3.085-3.64-1.503 0-2.126.914-3.38.914-1.306 0-1.922-.914-3.418-.914z"/></svg>
                 </button>
              </div>
            </div>
          }

          @if (step() === 'biometric') {
            <div class="flex-1 flex flex-col items-center justify-center text-center animate-fade-in pt-8">
               <div class="relative mb-8">
                 <div class="w-32 h-32 bg-[#ECFDF5] dark:bg-stone-800 rounded-full flex items-center justify-center" [class.animate-pulse]="!isLoading()">
                    <svg [class.text-stone-300]="isLoading()" [class.dark:text-stone-600]="isLoading()" [class.text-[#059669]]="!isLoading()" [class.dark:text-[#10B981]]="!isLoading()" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.07.91 2.07 2 2.07s2-.93 2-2.07a2 2 0 0 0-2-2z"/><path d="M19.38 10a7.46 7.46 0 0 0-1.1-2.28c-.85-1.12-1.98-1.93-3.23-2.37A7.46 7.46 0 0 0 12 5a7.46 7.46 0 0 0-3.05.35c-1.25.44-2.38 1.25-3.23 2.37A7.46 7.46 0 0 0 4.62 10"/><path d="M12 18.5a7.46 7.46 0 0 0 3.05-.35c1.25-.44 2.38-1.25 3.23-2.37a7.46 7.46 0 0 0 1.1-2.28"/><path d="M4.62 13.5a7.46 7.46 0 0 0 1.1 2.28c.85 1.12 1.98 1.93 3.23 2.37"/></svg>
                 </div>
                 @if (!isLoading()) {
                   <div class="absolute -top-1 -right-1 bg-[#059669] dark:bg-[#10B981] text-white rounded-full p-1 border-2 border-white dark:border-stone-900">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                 }
               </div>

               <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-4">Enable Biometrics</h2>
               <p class="text-stone-500 dark:text-stone-400 mb-12 max-w-xs leading-relaxed">Login quickly and securely using Face ID or Fingerprint. We do not store your biometric data.</p>

               <button (click)="enableBiometrics()" [disabled]="isLoading()" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all mb-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed">
                @if (isLoading()) {
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying...</span>
                } @else {
                  <span>Enable Face ID</span>
                }
              </button>
              <button (click)="setStep('seed')" [disabled]="isLoading()" class="w-full text-[#059669] dark:text-[#10B981] font-medium py-3 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-2xl transition-colors disabled:opacity-50">Set PIN Code instead</button>
            </div>
          }

          @if (step() === 'seed') {
            <div class="flex-1 pt-4 animate-fade-in pb-4">
               <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4 flex gap-3 mb-6">
                  <div class="text-red-500 shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-red-900 dark:text-red-400 text-sm">Secret Recovery Phrase</h3>
                    <p class="text-xs text-red-800 dark:text-red-300 leading-snug">Do not share your seed phrase! Anyone with these words can steal your funds.</p>
                  </div>
               </div>

               <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-2">Back up your wallet</h2>
               <p class="text-stone-500 dark:text-stone-400 mb-8">Write down these 12 words in the correct order and keep them safe.</p>

               <div class="grid grid-cols-3 gap-3 mb-8">
                 @for (word of seedWords; track $index) {
                    <div class="bg-[#E6F4F1] dark:bg-stone-800 rounded-lg p-2 text-center">
                       <span class="block text-[10px] text-stone-400 font-bold mb-1">{{ $index + 1 }}.</span>
                       <span class="text-stone-800 dark:text-stone-200 text-sm font-medium">{{ word }}</span>
                    </div>
                 }
               </div>

               <button (click)="copyToClipboard()" class="w-full flex items-center justify-center gap-2 text-[#059669] dark:text-[#10B981] font-medium mb-8 hover:text-[#047857] dark:hover:text-[#34D399] transition-colors">
                 @if (copied()) {
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    Copied!
                 } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    Copy to Clipboard
                 }
               </button>

               <button (click)="startConfirmation()" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                 I've Saved It
               </button>
            </div>
          }

          @if (step() === 'confirm') {
            <div class="flex-1 pt-4 animate-fade-in pb-4">
              <div class="flex justify-between items-center mb-2">
                 <h2 class="text-2xl font-bold text-stone-900 dark:text-white">Verify Phrase</h2>
              </div>
              <p class="text-stone-500 dark:text-stone-400 mb-6">Tap the words in the correct order to verify your backup.</p>

              <!-- Confirmed Area -->
              <div class="bg-stone-50 dark:bg-stone-800/50 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl p-4 min-h-[140px] mb-6 transition-colors flex flex-col" [class.border-red-300]="error()" [class.dark:border-red-900]="error()">
                <div class="flex flex-wrap gap-2 w-full">
                   @for (word of confirmedWords(); track $index) {
                     <button (click)="removeWord(word)" class="bg-[#059669] dark:bg-[#10B981] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#047857] dark:hover:bg-[#34D399] transition-colors animate-fade-in">
                       {{ $index + 1 }}. {{ word }}
                     </button>
                   }
                </div>
                
                @if (confirmedWords().length === 0) {
                     <div class="flex-1 flex flex-col items-center justify-center py-6 gap-3">
                         <span class="text-stone-400 text-sm">Select words below or</span>
                         <button (click)="pasteToConfirm()" class="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-sm font-medium flex items-center gap-1.5 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                            Paste
                         </button>
                     </div>
                }
              </div>

              @if (error()) {
                <p class="text-red-500 text-sm font-medium mb-4 text-center animate-bounce">{{ error() }}</p>
              }

              <!-- Shuffled Area -->
              <div class="grid grid-cols-3 gap-2 mb-8">
                @for (word of shuffledWords(); track $index) {
                   <button (click)="selectWord(word)" class="bg-[#E6F4F1] dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-transparent hover:border-[#059669] dark:hover:border-[#10B981] rounded-lg p-2 text-center text-sm font-medium transition-all active:scale-95">
                      {{ word }}
                   </button>
                }
              </div>

              <button (click)="verify()" [disabled]="confirmedWords().length !== 12" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                 Verify & Finish
              </button>
            </div>
          }

          @if (step() === 'import') {
             <div class="flex-1 pt-8 animate-fade-in">
               <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-2">Import Wallet</h2>
               <p class="text-stone-500 dark:text-stone-400 mb-8">Enter your 12 or 24-word Secret Recovery Phrase to restore your wallet.</p>
               
               <div class="relative mb-6">
                 <textarea [(ngModel)]="importPhrase" rows="4" class="w-full px-4 py-3 pb-8 rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#059669] dark:focus:ring-[#10B981] bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all resize-none text-sm leading-relaxed font-mono" placeholder="alpha orbit prism velvet echo..."></textarea>
                 
                 <div class="absolute bottom-3 right-3 flex items-center gap-3">
                    <span class="text-xs font-medium transition-colors" [class.text-green-500]="wordCount() >= 12" [class.text-stone-400]="wordCount() < 12">
                      {{ wordCount() }}/12
                    </span>
                    <button (click)="pastePhrase()" class="flex items-center gap-1 text-xs text-stone-400 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors bg-white dark:bg-stone-700 px-2 py-1 rounded-md shadow-sm border border-stone-100 dark:border-stone-600">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                       Paste
                    </button>
                 </div>
               </div>

               @if (error()) {
                <div class="flex items-center gap-2 text-red-500 text-sm font-medium mb-6 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                  {{ error() }}
                </div>
               }

               <div class="flex items-start gap-3 mb-8">
                  <svg class="text-stone-400 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <p class="text-xs text-stone-500 dark:text-stone-400 leading-snug">Ensure you are in a safe location and no one is watching. Your recovery phrase grants full access to your funds.</p>
               </div>

               <button (click)="validateAndImport()" [disabled]="wordCount() < 12" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                 Import Wallet
               </button>
             </div>
          }
       </div>
    </div>
  `
})
export class OnboardingComponent {
  step = signal<Step>('welcome');
  signupMethod = signal<'email' | 'phone'>('email');
  isLoading = signal(false);
  copied = signal(false);
  
  // Create Account State
  email = signal('alex.morgan@example.com');
  phone = signal('');
  password = signal('password123');

  seedWords = ['Alpha', 'Orbit', 'Prism', 'Velvet', 'Echo', 'Flux', 'Gravity', 'Lunar', 'Neon', 'Pulse', 'Solar', 'Zenith'];
  
  // Confirmation state
  shuffledWords = signal<string[]>([]);
  confirmedWords = signal<string[]>([]);
  error = signal<string | null>(null);

  // Import state
  importPhrase = signal('');
  
  // Computed for UI feedback
  wordCount = computed(() => {
    const text = this.importPhrase().trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(w => w.length > 0).length;
  });

  private router = inject(Router);
  private cryptoService = inject(CryptoService);

  setStep(s: Step) {
    this.step.set(s);
    this.error.set(null); // Clear errors when changing steps
  }

  goBack() {
    const current = this.step();
    switch (current) {
        case 'create':
        case 'import':
            this.setStep('welcome');
            break;
        case 'biometric':
            this.setStep('create');
            break;
        case 'seed':
            this.setStep('biometric');
            break;
        case 'confirm':
            this.setStep('seed');
            break;
        default:
            break;
    }
  }

  async enableBiometrics() {
    this.isLoading.set(true);
    try {
      await this.cryptoService.enrollBiometrics();
      this.setStep('seed');
    } catch (error) {
      console.error('Biometric enrollment failed', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  socialSignup(provider: 'google' | 'apple') {
     // Simulate social login with a delay
     this.isLoading.set(true);
     setTimeout(() => {
         this.isLoading.set(false);
         this.finish();
     }, 1500);
  }

  async copyToClipboard() {
    const phrase = this.seedWords.join(' ');
    try {
      await navigator.clipboard.writeText(phrase);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      // Fallback UI feedback
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  // Initialize confirmation step
  startConfirmation() {
    const shuffled = [...this.seedWords].sort(() => Math.random() - 0.5);
    this.shuffledWords.set(shuffled);
    this.confirmedWords.set([]);
    this.error.set(null);
    this.setStep('confirm');
  }

  selectWord(word: string) {
    this.confirmedWords.update(words => [...words, word]);
    this.shuffledWords.update(words => words.filter(w => w !== word));
    this.error.set(null);
  }

  removeWord(word: string) {
    this.confirmedWords.update(words => words.filter(w => w !== word));
    this.shuffledWords.update(words => [...words, word]);
    this.error.set(null);
  }

  async pasteToConfirm() {
      try {
          const text = await navigator.clipboard.readText();
          if(!text) throw new Error('Empty');
          
          const words = text.trim().split(/\s+/);
          // For UX in this demo, we'll allow pasting to autofill even if it's not perfect validation yet
          if (words.length >= 12) {
             const first12 = words.slice(0, 12);
             // Standardize casing for comparison in real apps, but here we just accept them
             this.confirmedWords.set(first12);
             this.shuffledWords.set([]);
             this.error.set(null);
          } else {
             this.error.set(`Clipboard contains ${words.length} words. 12 required.`);
          }
      } catch(e) {
          // Fallback for demo if clipboard fails or is empty in dev environment
          this.confirmedWords.set([...this.seedWords]);
          this.shuffledWords.set([]);
          this.error.set(null);
      }
  }

  verify() {
    // In a real app, normalize strings
    const isCorrect = this.confirmedWords().join(' ').toLowerCase() === this.seedWords.join(' ').toLowerCase();
    if (isCorrect) {
        this.finish();
    } else {
        this.error.set('Incorrect order or words. Please try again.');
    }
  }

  async pastePhrase() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        this.importPhrase.set(text);
      } else {
        throw new Error('Clipboard empty');
      }
    } catch (err) {
      // Fallback for development/testing: fill with valid phrase
      this.importPhrase.set(this.seedWords.join(' '));
    }
  }

  validateAndImport() {
    const count = this.wordCount();

    if (count >= 12) {
      // In a real app, we would validate BIP-39 checksum here
      this.finish();
    } else {
      this.error.set('Invalid phrase. Please enter at least 12 words.');
    }
  }

  finish() {
    this.cryptoService.login();
    this.router.navigate(['/home']);
  }
}