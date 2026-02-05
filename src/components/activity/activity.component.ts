import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 pt-8 pb-24 md:pb-10 h-full max-w-5xl mx-auto flex flex-col">
       <div class="flex justify-between items-center mb-8">
          <div class="flex items-center gap-4">
             <a routerLink="/home" class="md:hidden p-2 -ml-2 text-stone-800 dark:text-stone-200">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </a>
             <h1 class="text-2xl font-bold text-stone-900 dark:text-white">Transactions</h1>
          </div>
          <div class="flex gap-2 text-stone-800 dark:text-stone-200">
             <button class="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
             <button class="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></button>
          </div>
       </div>

       <!-- Filters -->
       <div class="flex gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
          @for(filter of filters; track filter) {
             <button 
               (click)="activeFilter.set(filter)"
               [class.bg-stone-800]="activeFilter() === filter"
               [class.dark:bg-white]="activeFilter() === filter"
               [class.text-white]="activeFilter() === filter"
               [class.dark:text-stone-900]="activeFilter() === filter"
               [class.bg-white]="activeFilter() !== filter"
               [class.dark:bg-stone-900]="activeFilter() !== filter"
               [class.text-stone-600]="activeFilter() !== filter"
               [class.dark:text-stone-400]="activeFilter() !== filter"
               class="px-6 py-2 rounded-full border border-stone-200 dark:border-stone-800 text-sm font-medium whitespace-nowrap transition-all hover:border-stone-400 dark:hover:border-stone-600">
               {{ filter }}
             </button>
          }
       </div>

       <div class="flex-1 space-y-8">
          <div class="bg-white dark:bg-stone-900 md:p-6 md:rounded-3xl md:shadow-sm md:border md:border-stone-100 dark:md:border-stone-800">
            <h3 class="text-sm font-bold uppercase tracking-wider text-stone-400 mb-6 md:mb-4 px-2 md:px-0">Today</h3>
            <div class="space-y-6 md:space-y-4">
               @for(tx of todayTransactions(); track tx.id) {
                 <div [routerLink]="['/activity', tx.id]" class="flex items-center justify-between p-2 md:p-4 rounded-xl md:hover:bg-stone-50 dark:md:hover:bg-stone-800 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4">
                       <div class="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                          [class.bg-green-100]="tx.type === 'receive'"
                          [class.dark:bg-green-900]="tx.type === 'receive'"
                          [class.text-green-600]="tx.type === 'receive'"
                          [class.dark:text-green-400]="tx.type === 'receive'"
                          [class.bg-stone-100]="tx.type === 'swap'"
                          [class.dark:bg-stone-800]="tx.type === 'swap'"
                          [class.text-stone-600]="tx.type === 'swap'"
                          [class.dark:text-stone-400]="tx.type === 'swap'"
                          [class.bg-red-100]="tx.type === 'send' || tx.type === 'failed'"
                          [class.dark:bg-red-900]="tx.type === 'send' || tx.type === 'failed'"
                          [class.text-red-600]="tx.type === 'send' || tx.type === 'failed'"
                          [class.dark:text-red-400]="tx.type === 'send' || tx.type === 'failed'"
                       >
                          @if(tx.type === 'receive') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg> }
                          @if(tx.type === 'send') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> }
                          @if(tx.type === 'swap') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 21-4.5-4.5 4.5-4.5"/><path d="m3 16.5h13.5"/><path d="m16.5 3 4.5 4.5-4.5 4.5"/><path d="m21 7.5H7.5"/></svg> }
                          @if(tx.type === 'failed') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg> }
                       </div>
                       <div>
                          <h4 class="font-bold text-stone-900 dark:text-stone-100 text-sm md:text-base">
                            @if(tx.type === 'receive') { Received {{ tx.asset }} }
                            @if(tx.type === 'send') { Sent {{ tx.asset }} }
                            @if(tx.type === 'swap') { Swap {{ tx.asset }} to USDT }
                            @if(tx.type === 'failed') { Smart Contract Call }
                          </h4>
                          <div class="text-xs md:text-sm text-stone-500 dark:text-stone-400 font-medium flex items-center gap-2">
                             @if(tx.from) { <span class="hidden md:inline">From:</span> {{ tx.from }} }
                             @if(tx.to) { <span class="hidden md:inline">To:</span> {{ tx.to }} }
                             @if(tx.type === 'swap') { Gas: $4.50 }
                             @if(tx.type === 'failed') { Failed }
                             <span class="w-1 h-1 bg-stone-300 dark:bg-stone-600 rounded-full"></span>
                             {{ tx.date.split(',')[1] || tx.date }}
                          </div>
                       </div>
                    </div>
                    <div class="text-right">
                       @if(tx.type !== 'failed') {
                          <div class="font-bold text-sm md:text-base" [class.text-green-600]="tx.type === 'receive'" [class.dark:text-green-400]="tx.type === 'receive'" [class.text-stone-900]="tx.type !== 'receive'" [class.dark:text-stone-100]="tx.type !== 'receive'">{{ tx.amount }}</div>
                          <div class="text-xs md:text-sm text-stone-500 dark:text-stone-400 font-medium">{{ tx.amountUsd }}</div>
                       } @else {
                          <div class="text-[#C64A23] dark:text-[#E85D36] font-bold text-sm">Failed</div>
                       }
                    </div>
                 </div>
               }
            </div>
          </div>

          <div class="bg-white dark:bg-stone-900 md:p-6 md:rounded-3xl md:shadow-sm md:border md:border-stone-100 dark:md:border-stone-800">
             <h3 class="text-sm font-bold uppercase tracking-wider text-stone-400 mb-6 md:mb-4 px-2 md:px-0">Yesterday</h3>
             <div class="space-y-6 md:space-y-4">
               @for(tx of yesterdayTransactions(); track tx.id) {
                 <div [routerLink]="['/activity', tx.id]" class="flex items-center justify-between p-2 md:p-4 rounded-xl md:hover:bg-stone-50 dark:md:hover:bg-stone-800 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4">
                       <div class="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                          [class.bg-green-100]="tx.type === 'receive'"
                          [class.dark:bg-green-900]="tx.type === 'receive'"
                          [class.text-green-600]="tx.type === 'receive'"
                          [class.dark:text-green-400]="tx.type === 'receive'"
                          [class.bg-stone-100]="tx.type === 'swap'"
                          [class.dark:bg-stone-800]="tx.type === 'swap'"
                          [class.text-stone-600]="tx.type === 'swap'"
                          [class.dark:text-stone-400]="tx.type === 'swap'"
                          [class.bg-red-100]="tx.type === 'send' || tx.type === 'failed'"
                          [class.dark:bg-red-900]="tx.type === 'send' || tx.type === 'failed'"
                          [class.text-red-600]="tx.type === 'send' || tx.type === 'failed'"
                          [class.dark:text-red-400]="tx.type === 'send' || tx.type === 'failed'"
                       >
                          @if(tx.type === 'receive') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg> }
                          @if(tx.type === 'send') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> }
                          @if(tx.type === 'failed') { <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg> }
                       </div>
                       <div>
                          <h4 class="font-bold text-stone-900 dark:text-stone-100 text-sm md:text-base">
                            @if(tx.type === 'receive') { Received {{ tx.asset }} }
                            @if(tx.type === 'send') { Sent {{ tx.asset }} }
                            @if(tx.type === 'failed') { Smart Contract Call }
                          </h4>
                          <div class="text-xs md:text-sm text-stone-500 dark:text-stone-400 font-medium flex items-center gap-2">
                             @if(tx.from) { <span class="hidden md:inline">From:</span> {{ tx.from }} }
                             @if(tx.to) { <span class="hidden md:inline">To:</span> {{ tx.to }} }
                             @if(tx.type === 'failed') { Failed }
                             <span class="w-1 h-1 bg-stone-300 dark:bg-stone-600 rounded-full"></span>
                             {{ tx.date.split(',')[1] || tx.date }}
                          </div>
                       </div>
                    </div>
                    <div class="text-right">
                       @if(tx.type !== 'failed') {
                          <div class="font-bold text-sm md:text-base" [class.text-green-600]="tx.type === 'receive'" [class.dark:text-green-400]="tx.type === 'receive'" [class.text-stone-900]="tx.type !== 'receive'" [class.dark:text-stone-100]="tx.type !== 'receive'">{{ tx.amount }}</div>
                          <div class="text-xs md:text-sm text-stone-500 dark:text-stone-400 font-medium">{{ tx.amountUsd }}</div>
                       } @else {
                          <div class="text-[#C64A23] dark:text-[#E85D36] font-bold text-sm">Failed</div>
                       }
                    </div>
                 </div>
               }
             </div>
          </div>
       </div>
    </div>
  `
})
export class ActivityComponent {
  cryptoService = inject(CryptoService);
  filters = ['All', 'Sent', 'Received', 'Swaps', 'Pending'];
  activeFilter = signal('All');

  todayTransactions = computed(() => {
    return this.cryptoService.transactions().filter(t => t.date.includes('Today'));
  });

  yesterdayTransactions = computed(() => {
    return this.cryptoService.transactions().filter(t => !t.date.includes('Today'));
  });
}