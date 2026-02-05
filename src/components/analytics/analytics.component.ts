import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 pt-8 pb-24 md:pb-10 h-full max-w-6xl mx-auto flex flex-col">
       <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-4">
             <a routerLink="/home" class="md:hidden p-2 -ml-2 text-stone-800 dark:text-stone-200">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </a>
             <h1 class="text-2xl font-bold text-stone-900 dark:text-white">Analytics</h1>
          </div>
          <button (click)="share()" class="p-2 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors relative group">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
             @if(showShareTooltip()) {
                <span class="absolute right-0 top-full mt-2 px-3 py-1 bg-stone-800 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50 animate-fade-in">Link Copied!</span>
             }
          </button>
       </div>

       <!-- Top Controls -->
       <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div class="bg-stone-100 dark:bg-stone-800 p-1 rounded-xl flex w-full md:w-64">
             <button (click)="viewMode.set('portfolio')" 
                [class]="viewMode() === 'portfolio' ? 'bg-[#D1FAE5] dark:bg-stone-700 text-[#059669] dark:text-[#10B981] shadow-sm' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'"
                class="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200">Portfolio</button>
             <button (click)="viewMode.set('market')"
                [class]="viewMode() === 'market' ? 'bg-[#D1FAE5] dark:bg-stone-700 text-[#059669] dark:text-[#10B981] shadow-sm' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'"
                class="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200">Market</button>
          </div>
          
          <div class="flex justify-between md:justify-end gap-2 px-2 md:px-0 bg-stone-50 dark:bg-stone-800 p-2 md:p-0 rounded-xl">
             @for (range of ranges; track range) {
                <button (click)="setTimeRange(range)"
                   [class]="timeRange() === range ? 'bg-[#064E3B] dark:bg-stone-700 text-white shadow-md' : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'"
                   class="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200">
                   {{ range }}
                </button>
             }
          </div>
       </div>

       <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Chart Section -->
          <div class="lg:col-span-2 bg-white dark:bg-stone-900 rounded-3xl md:border border-stone-100 dark:border-stone-800 md:shadow-sm md:p-8">
             <!-- Total Balance Small -->
             <div class="mb-8">
               <p class="text-stone-500 dark:text-stone-400 text-sm font-medium mb-1">
                 {{ viewMode() === 'portfolio' ? 'Total Valuation' : 'Global Market Cap' }}
               </p>
               <div class="flex items-baseline gap-4">
                  <h2 class="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-1 animate-fade-in">
                    {{ viewMode() === 'portfolio' ? '$24,593.42' : '$1.82T' }}
                  </h2>
                  <span class="text-green-600 dark:text-green-400 text-sm font-semibold flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    {{ currentStats().change }}
                  </span>
               </div>
             </div>

             <!-- Chart Area -->
             <div class="relative h-64 md:h-80 w-full mb-8">
                <!-- Tooltip Mock -->
                <div class="absolute top-12 right-1/4 z-10 animate-bounce-slow" [class.opacity-0]="viewMode() === 'market'">
                   <div class="bg-[#1A1A1A] dark:bg-stone-700 text-white text-xs font-medium py-2 px-4 rounded-xl shadow-xl text-center transform -translate-x-1/2">
                      $24,100.00<br/><span class="text-stone-400 text-[10px]">Oct 24, 14:00</span>
                   </div>
                   <div class="w-2.5 h-2.5 bg-[#1A1A1A] dark:bg-stone-700 rotate-45 absolute left-1/2 -bottom-1 -translate-x-1/2"></div>
                   <!-- Dashed Line -->
                   <div class="w-px h-32 border-l border-dashed border-[#059669]/50 dark:border-[#10B981]/50 absolute left-1/2 top-full"></div>
                   <div class="w-4 h-4 bg-white dark:bg-stone-900 border-4 border-[#059669] dark:border-[#10B981] rounded-full absolute left-1/2 top-full -translate-x-1/2 shadow-sm"></div>
                </div>

                <!-- SVG Chart -->
                <svg viewBox="0 0 100 50" class="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                     <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#059669" stop-opacity="0.1"/>
                        <stop offset="100%" stop-color="#059669" stop-opacity="0"/>
                     </linearGradient>
                  </defs>
                  <!-- We use a trackBy or just update the path attribute to animate -->
                  <path [attr.d]="chartPath()" fill="url(#gradient)" class="transition-all duration-700 ease-in-out" />
                  <path [attr.d]="chartPath()" fill="none" stroke="#059669" stroke-width="0.5" vector-effect="non-scaling-stroke" class="transition-all duration-700 ease-in-out" />
                </svg>
             </div>
          </div>

          <!-- Stats Column -->
          <div class="space-y-6">
             <div class="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div class="bg-[#F2F5F4] dark:bg-stone-900 border border-[#A7F3D0] dark:border-stone-800 p-5 rounded-2xl hover:shadow-md transition-shadow">
                   <div class="flex justify-between items-start mb-2">
                      <div class="w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center text-[#059669] dark:text-[#10B981] shadow-sm">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                      </div>
                      <span class="text-green-600 dark:text-green-400 text-xs font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg animate-fade-in">+{{ (currentStats().percentage * 1.5).toFixed(1) }}%</span>
                   </div>
                   <p class="text-xs text-stone-500 dark:text-stone-400 mb-1 font-semibold uppercase tracking-wide">
                     {{ viewMode() === 'portfolio' ? 'Total Profit' : '24h Vol' }}
                   </p>
                   <p class="text-xl font-bold text-stone-900 dark:text-white animate-fade-in">
                     {{ viewMode() === 'portfolio' ? currentStats().profit : '$42.5B' }}
                   </p>
                </div>

                <div class="bg-[#F2F5F4] dark:bg-stone-900 border border-[#A7F3D0] dark:border-stone-800 p-5 rounded-2xl hover:shadow-md transition-shadow">
                   <div class="flex justify-between items-start mb-2">
                      <div class="w-10 h-10 rounded-full bg-[#F7931A] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                         ₿
                      </div>
                      <span class="text-green-600 dark:text-green-400 text-xs font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">+12.5%</span>
                   </div>
                   <p class="text-xs text-stone-500 dark:text-stone-400 mb-1 font-semibold uppercase tracking-wide">
                     {{ viewMode() === 'portfolio' ? 'Best Performer' : 'Top Gainer' }}
                   </p>
                   <p class="text-xl font-bold text-stone-900 dark:text-white">Bitcoin</p>
                </div>
             </div>

             <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm">
                <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-6">Asset Allocation</h3>
                <div class="space-y-6">
                   <div>
                      <div class="flex justify-between mb-2">
                        <div class="flex items-center gap-3">
                           <div class="w-8 h-8 rounded-full bg-[#F7931A] text-white flex items-center justify-center text-xs shadow-sm">₿</div>
                           <span class="font-bold text-stone-900 dark:text-stone-100 text-sm">Bitcoin <span class="text-stone-400 font-normal ml-1">BTC</span></span>
                        </div>
                        <div class="text-right">
                           <div class="font-bold text-sm dark:text-stone-100">$11,067.04</div>
                           <div class="text-[10px] text-stone-400">45%</div>
                        </div>
                      </div>
                      <div class="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                         <div class="h-full bg-[#F7931A] rounded-full w-[45%]"></div>
                      </div>
                   </div>

                   <div>
                      <div class="flex justify-between mb-2">
                        <div class="flex items-center gap-3">
                           <div class="w-8 h-8 rounded-full bg-[#627EEA] text-white flex items-center justify-center text-xs shadow-sm">Ξ</div>
                           <span class="font-bold text-stone-900 dark:text-stone-100 text-sm">Ethereum <span class="text-stone-400 font-normal ml-1">ETH</span></span>
                        </div>
                        <div class="text-right">
                           <div class="font-bold text-sm dark:text-stone-100">$7,378.02</div>
                           <div class="text-[10px] text-stone-400">30%</div>
                        </div>
                      </div>
                      <div class="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                         <div class="h-full bg-[#627EEA] rounded-full w-[30%]"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  `]
})
export class AnalyticsComponent {
  viewMode = signal<'portfolio' | 'market'>('portfolio');
  timeRange = signal<'24H' | '7D' | '30D' | '1Y' | 'ALL'>('7D');
  showShareTooltip = signal(false);
  
  ranges = ['24H', '7D', '30D', '1Y', 'ALL'] as const;

  currentStats = computed(() => {
    switch(this.timeRange()) {
        case '24H': return { change: '+$120.50 (0.8%)', profit: '$120.12', percentage: 0.8 };
        case '7D': return { change: '+$1,240.50 (5.32%)', profit: '$3,290.12', percentage: 5.32 };
        case '30D': return { change: '+$3,450.20 (12.4%)', profit: '$5,100.45', percentage: 12.4 };
        case '1Y': return { change: '+$15,200.00 (145%)', profit: '$18,500.00', percentage: 145 };
        case 'ALL': return { change: '+$21,000.00 (520%)', profit: '$22,000.00', percentage: 520 };
        default: return { change: '+$1,240.50 (5.32%)', profit: '$3,290.12', percentage: 5.32 };
    }
  });

  chartPath = computed(() => {
    // Return different SVG paths based on time range to simulate chart updates
    switch(this.timeRange()) {
        case '24H': return "M0,45 Q10,42 20,43 T40,40 T60,38 T80,35 T100,30 V50 H0 Z";
        case '7D': return "M0,40 Q10,38 20,35 T40,30 T60,25 T80,28 T100,20 V50 H0 Z"; // Original
        case '30D': return "M0,35 Q10,30 20,25 T40,28 T60,20 T80,15 T100,10 V50 H0 Z";
        case '1Y': return "M0,45 Q20,40 40,20 T80,10 T100,5 V50 H0 Z";
        case 'ALL': return "M0,48 Q10,45 30,35 T60,20 T100,2 V50 H0 Z";
        default: return "M0,40 Q10,38 20,35 T40,30 T60,25 T80,28 T100,20 V50 H0 Z";
    }
  });

  setTimeRange(range: typeof this.ranges[number]) {
    this.timeRange.set(range);
  }

  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lumina Wallet Analytics',
          text: `My portfolio is up ${this.currentStats().change}!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
        // Fallback for browsers without share API
        this.showShareTooltip.set(true);
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => this.showShareTooltip.set(false), 2000);
    }
  }
}