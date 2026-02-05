import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-swap',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-4 md:p-8 pt-6 pb-24 md:pb-12 min-h-full max-w-7xl mx-auto flex flex-col justify-center">
       
       <!-- Header -->
       <div class="flex justify-between items-center mb-6 md:mb-8">
          <div class="flex items-center gap-3">
            <button (click)="goBack()" class="p-2 -ml-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-full transition-colors bg-white dark:bg-stone-800 shadow-sm border border-stone-100 dark:border-stone-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Swap Tokens</h1>
          </div>
          <!-- Mobile Settings Button (Hidden on Desktop as settings are expanded) -->
          <button class="lg:hidden p-2 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="21" y2="21"/><line x1="4" x2="20" y1="14" y2="14"/><line x1="4" x2="20" y1="7" y2="7"/><circle cx="14" cy="21" r="2"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="14" r="2"/></svg>
          </button>
       </div>

       <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
         
         <!-- Left Column: Inputs (lg:col-span-7) -->
         <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            
            <!-- Main Swap Card -->
            <div class="bg-white dark:bg-stone-900 rounded-[2.5rem] p-4 md:p-8 shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 relative">
                 
                 <!-- Pay Input -->
                 <div class="bg-[#ECFDF5] dark:bg-stone-800/50 p-6 rounded-[2rem] hover:ring-2 ring-[#059669]/10 dark:ring-[#10B981]/20 transition-all border border-transparent dark:border-stone-700/50">
                    <div class="flex justify-between text-sm text-stone-500 dark:text-stone-400 font-medium mb-4">
                       <span>You pay</span>
                       <span class="text-[#059669] dark:text-[#10B981] bg-white dark:bg-stone-700 px-2 py-0.5 rounded-lg shadow-sm font-bold text-xs">Max: 2.45 ETH</span>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <button class="flex items-center gap-3 bg-white dark:bg-stone-700 pl-3 pr-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all group w-full md:w-auto">
                          <div class="w-10 h-10 rounded-full bg-[#627EEA] flex items-center justify-center text-white text-lg shadow-inner shrink-0">Ξ</div>
                          <div class="text-left">
                             <div class="font-bold text-stone-900 dark:text-white text-lg leading-tight">ETH</div>
                             <div class="text-[10px] text-stone-500 dark:text-stone-400 font-medium group-hover:text-[#059669] transition-colors">Ethereum</div>
                          </div>
                          <svg class="text-stone-400 ml-auto md:ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                       </button>
                       <div class="flex-1 w-full md:w-auto text-right">
                          <input type="number" value="1.5" class="w-full bg-transparent text-right text-4xl md:text-5xl font-bold text-stone-900 dark:text-white focus:outline-none placeholder-stone-300 dark:placeholder-stone-600" placeholder="0" />
                          <div class="text-stone-400 text-sm font-medium mt-1">~$2,840.12</div>
                       </div>
                    </div>
                 </div>

                 <!-- Swap Trigger (Floating) -->
                 <div class="relative h-4 z-10">
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <button class="w-12 h-12 bg-white dark:bg-stone-700 border-4 border-[#F2F5F4] dark:border-stone-900 rounded-2xl flex items-center justify-center text-[#059669] dark:text-[#10B981] hover:scale-110 shadow-lg transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 10.5a2.5 2.5 0 0 1 5 0v10.5"/><path d="M22 13.5a2.5 2.5 0 0 0-5 0"/><path d="M12 13.5a2.5 2.5 0 0 0-5 0"/><path d="M12 11V3"/><path d="m15 6-3-3-3 3"/></svg>
                        </button>
                    </div>
                 </div>

                 <!-- Receive Input -->
                 <div class="bg-[#ECFDF5] dark:bg-stone-800/50 p-6 rounded-[2rem] hover:ring-2 ring-[#059669]/10 dark:ring-[#10B981]/20 transition-all border border-transparent dark:border-stone-700/50">
                    <div class="flex justify-between text-sm text-stone-500 dark:text-stone-400 font-medium mb-4">
                       <span>You receive</span>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <button class="flex items-center gap-3 bg-white dark:bg-stone-700 pl-3 pr-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all group w-full md:w-auto">
                          <div class="w-10 h-10 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-lg shadow-inner shrink-0">T</div>
                          <div class="text-left">
                             <div class="font-bold text-stone-900 dark:text-white text-lg leading-tight">USDT</div>
                             <div class="text-[10px] text-stone-500 dark:text-stone-400 font-medium group-hover:text-[#059669] transition-colors">Tether</div>
                          </div>
                          <svg class="text-stone-400 ml-auto md:ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                       </button>
                       <div class="flex-1 w-full md:w-auto text-right">
                          <input type="text" value="2,840.50" readonly class="w-full bg-transparent text-right text-4xl md:text-5xl font-bold text-stone-900 dark:text-white focus:outline-none" />
                          <div class="text-stone-400 text-sm font-medium mt-1">~$2,840.50 <span class="text-xs bg-stone-200 dark:bg-stone-600 px-1 rounded text-stone-600 dark:text-stone-300 ml-1">-0.05%</span></div>
                       </div>
                    </div>
                 </div>

                 <!-- Mobile Only: Compact Settings/Details (Hidden on Desktop) -->
                 <div class="lg:hidden mt-6">
                    <!-- Slippage Row -->
                    <div class="flex justify-between items-center mb-4 px-2">
                        <div class="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 text-sm font-medium">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                           Slippage Tolerance
                        </div>
                        <button class="text-[#059669] dark:text-[#10B981] bg-[#D1FAE5] dark:bg-stone-800 px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#A7F3D0] dark:hover:bg-stone-700 transition-colors">0.5%</button>
                    </div>

                    <!-- Details Card -->
                    <div class="border border-stone-200 dark:border-stone-800 rounded-2xl p-4 bg-stone-50 dark:bg-stone-800/50 mb-8 space-y-3">
                        <div class="flex justify-between items-center">
                           <span class="text-sm text-stone-500 dark:text-stone-400">Rate</span>
                           <span class="text-sm font-medium text-stone-900 dark:text-stone-200">1 ETH = 1,893.66 USDT</span>
                        </div>
                        <div class="flex justify-between items-center">
                           <span class="text-sm text-stone-500 dark:text-stone-400">Network Fee</span>
                           <div class="flex items-center gap-1 text-sm font-medium text-stone-900 dark:text-stone-200">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><path d="M14 2v6h6"/><path d="M3 15h6"/><path d="M5 12v6"/><path d="M7 12v6"/></svg>
                              ~$4.50 (0.002 ETH)
                           </div>
                        </div>
                        <div class="flex justify-between items-center">
                           <span class="text-sm text-stone-500 dark:text-stone-400">Price Impact</span>
                           <span class="text-sm font-medium text-green-600 dark:text-green-400">< 0.01%</span>
                        </div>
                     </div>
                 </div>

                 <!-- Action Button -->
                 <div class="mt-8">
                    <button class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-bold text-lg md:text-xl py-4 md:py-5 rounded-2xl md:rounded-[2rem] shadow-xl shadow-[#059669]/25 dark:shadow-[#10B981]/25 hover:bg-[#047857] dark:hover:bg-[#059669] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                      <span>Review Swap</span>
                      <svg class="hidden md:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                 </div>
            </div>
         </div>

         <!-- Right Column: Settings & Info (Hidden on Mobile, Visible on lg+) -->
         <div class="hidden lg:block lg:col-span-5 xl:col-span-4 space-y-6">
            
            <!-- Slippage Card -->
            <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm">
               <div class="flex items-center gap-2 mb-4 text-stone-900 dark:text-white font-bold text-lg">
                  <svg class="text-[#059669] dark:text-[#10B981]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
                  Transaction Settings
               </div>
               
               <label class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 block">Slippage Tolerance</label>
               <div class="grid grid-cols-4 gap-2 mb-2">
                  <button class="py-2 rounded-xl text-sm font-bold bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors">0.1%</button>
                  <button class="py-2 rounded-xl text-sm font-bold bg-[#D1FAE5] dark:bg-[#10B981] text-[#059669] dark:text-white shadow-sm ring-1 ring-[#059669]/20">0.5%</button>
                  <button class="py-2 rounded-xl text-sm font-bold bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors">1.0%</button>
                  <button class="py-2 rounded-xl text-sm font-bold bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors">Custom</button>
               </div>
               <p class="text-xs text-stone-400 leading-relaxed">Your transaction will revert if the price changes unfavorably by more than this percentage.</p>
            </div>

            <!-- Expanded Details Card -->
            <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm">
               <div class="flex items-center gap-2 mb-6 text-stone-900 dark:text-white font-bold text-lg">
                  <svg class="text-[#059669] dark:text-[#10B981]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                  Transaction Details
               </div>

               <div class="space-y-4">
                  <div class="flex justify-between items-center pb-4 border-b border-stone-50 dark:border-stone-800">
                     <span class="text-sm text-stone-500 dark:text-stone-400 font-medium">Rate</span>
                     <div class="text-right">
                       <span class="block text-sm font-bold text-stone-900 dark:text-stone-200">1 ETH = 1,893.66 USDT</span>
                       <span class="block text-xs text-stone-400">1 USDT = 0.000528 ETH</span>
                     </div>
                  </div>
                  <div class="flex justify-between items-center pb-4 border-b border-stone-50 dark:border-stone-800">
                     <span class="text-sm text-stone-500 dark:text-stone-400 font-medium">Network Fee</span>
                     <div class="flex flex-col items-end">
                       <div class="flex items-center gap-1 text-sm font-bold text-stone-900 dark:text-stone-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9 6 6 6-6"/></svg>
                          ~$4.50
                       </div>
                       <span class="text-xs text-stone-400">0.002 ETH</span>
                     </div>
                  </div>
                  <div class="flex justify-between items-center pb-4 border-b border-stone-50 dark:border-stone-800">
                     <span class="text-sm text-stone-500 dark:text-stone-400 font-medium">Price Impact</span>
                     <span class="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg">< 0.01%</span>
                  </div>
                   <div class="flex justify-between items-center">
                     <span class="text-sm text-stone-500 dark:text-stone-400 font-medium">Minimum Received</span>
                     <span class="text-sm font-bold text-stone-900 dark:text-stone-200">2,826.30 USDT</span>
                  </div>
               </div>
            </div>
            
            <!-- Tip -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex gap-3">
               <svg class="text-blue-500 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
               <p class="text-xs text-blue-800 dark:text-blue-200 leading-snug font-medium">
                  <strong>Pro Tip:</strong> Check the network fee before swapping. Fees are higher during network congestion.
               </p>
            </div>

         </div>
       </div>
    </div>
  `
})
export class SwapComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}