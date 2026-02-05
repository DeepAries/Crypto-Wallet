import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 pt-8 pb-24 md:pb-10 h-full max-w-6xl mx-auto flex flex-col">
       <div class="flex justify-between items-center mb-6 md:mb-10">
          <div class="flex items-center gap-4">
             <a routerLink="/home" class="md:hidden p-2 -ml-2 text-stone-800 dark:text-stone-200">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </a>
             <h1 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">My Wallets</h1>
          </div>
          <div class="flex gap-3">
             <button class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#D1FAE5] dark:bg-stone-800 text-[#059669] dark:text-[#10B981] flex items-center justify-center hover:bg-[#A7F3D0] dark:hover:bg-stone-700 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M16 16h1.3a2 2 0 0 1 2 2v1.3"/><path d="M16 21c0-1.1.9-2 2-2h1.3"/></svg>
             </button>
             <button class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 flex items-center justify-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
             </button>
          </div>
       </div>

       <div class="flex flex-col lg:flex-row gap-8 lg:h-[600px]">
          <!-- Left Column: Card -->
          <div class="lg:w-1/2 flex flex-col">
             <!-- Wallet Card -->
             <div class="bg-gradient-to-br from-[#D1FAE5] to-[#F2F5F4] dark:from-stone-900 dark:to-stone-950 p-6 md:p-8 rounded-3xl border border-[#A7F3D0] dark:border-stone-800 shadow-md mb-8 relative overflow-hidden flex-1 min-h-[300px] flex flex-col justify-between">
                <div class="flex justify-between items-start mb-6 relative z-10">
                   <div class="flex items-center gap-2 bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                      <span class="text-sm md:text-base font-bold text-stone-800 dark:text-stone-200">Main Wallet</span>
                      <svg class="text-[#059669] dark:text-[#10B981]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   <button class="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                   </button>
                </div>

                <div class="mb-6 relative z-10">
                   <p class="text-stone-500 dark:text-stone-400 text-base mb-2 font-medium">Total Balance</p>
                   <h2 class="text-5xl md:text-6xl font-bold text-[#064E3B] dark:text-white">{{ cryptoService.totalBalance() | currency }}</h2>
                </div>

                <div class="bg-white/80 dark:bg-stone-800/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-between relative z-10 shadow-sm">
                   <div class="flex flex-col">
                      <span class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Address</span>
                      <span class="text-base font-mono text-stone-700 dark:text-stone-300 font-medium truncate">0x71C8...9A21</span>
                   </div>
                   <div class="flex gap-3 text-stone-600 dark:text-stone-400">
                      <button class="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
                      <button class="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg></button>
                      <button class="bg-[#064E3B] dark:bg-black text-white p-1.5 rounded hover:bg-[#022C22] dark:hover:bg-stone-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M16 16h1.3a2 2 0 0 1 2 2v1.3"/><path d="M16 21c0-1.1.9-2 2-2h1.3"/></svg></button>
                   </div>
                </div>
                
                <!-- Decorative circle -->
                <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl z-0"></div>
             </div>

             <!-- Pagination Dots -->
             <div class="flex justify-center gap-2 mb-8 lg:mb-0">
               <div class="w-10 h-2 bg-[#059669] dark:bg-[#10B981] rounded-full cursor-pointer"></div>
               <div class="w-2 h-2 bg-stone-300 dark:bg-stone-700 rounded-full cursor-pointer hover:bg-[#059669] dark:hover:bg-[#10B981] transition-colors"></div>
               <div class="w-2 h-2 bg-stone-300 dark:bg-stone-700 rounded-full cursor-pointer hover:bg-[#059669] dark:hover:bg-[#10B981] transition-colors"></div>
             </div>
          </div>

          <!-- Right Column: List -->
          <div class="lg:w-1/2 flex flex-col bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm p-6 overflow-hidden">
             <div class="flex justify-between items-center mb-6">
               <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100">Portfolio Breakdown</h3>
               <button class="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
               </button>
             </div>

             <div class="space-y-2 flex-1 overflow-y-auto no-scrollbar pr-2">
               @for (asset of cryptoService.assets(); track asset.id) {
                 <div class="flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4">
                       <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-110 transition-transform" [style.background-color]="asset.color">
                          {{ asset.icon }}
                       </div>
                       <div>
                          <h3 class="font-bold text-stone-900 dark:text-stone-100 text-base">{{ asset.name }}</h3>
                          <span class="text-sm text-stone-400 font-medium">{{ asset.symbol }}</span>
                       </div>
                    </div>
                    <div class="text-right">
                       <h4 class="font-bold text-stone-900 dark:text-stone-100 text-base">{{ (asset.balance * asset.price) | currency }}</h4>
                       <span class="text-sm text-stone-500 dark:text-stone-400 font-medium">{{ asset.balance }} {{ asset.symbol }}</span>
                    </div>
                 </div>
               }
             </div>
          </div>
       </div>
    </div>
  `
})
export class WalletComponent {
  cryptoService = inject(CryptoService);
}