import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="p-6 pt-8 pb-24 md:pb-10 h-full max-w-5xl mx-auto flex flex-col relative">
       <div class="flex justify-between items-center mb-8">
          <div class="flex items-center gap-4">
             <a routerLink="/home" class="md:hidden p-2 -ml-2 text-stone-800 dark:text-stone-100">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </a>
             <h1 class="text-2xl font-bold text-stone-900 dark:text-white">Settings</h1>
          </div>
          <button class="text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 p-2 rounded-full transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </button>
       </div>

       <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <!-- Column 1: Appearance & Network -->
          <div>
            <!-- Theme Toggle -->
            <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">Display</h3>
            <div class="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-2 mb-8 shadow-sm">
                <div class="flex items-center justify-between p-4 cursor-pointer" (click)="themeService.toggleTheme()">
                    <div class="flex items-center gap-4">
                        <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                            @if(themeService.isDark()) {
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                            } @else {
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            }
                        </div>
                        <span class="text-sm font-bold text-stone-800 dark:text-stone-200">Dark Mode</span>
                    </div>
                    <!-- Toggle Switch -->
                    <div class="w-12 h-7 bg-stone-200 dark:bg-[#059669] rounded-full relative transition-colors duration-300">
                        <div class="w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-transform duration-300"
                             [class.translate-x-1]="!themeService.isDark()"
                             [class.translate-x-6]="themeService.isDark()">
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">Current Network</h3>
            <!-- Active Network -->
            <div class="bg-[#D1FAE5] dark:bg-stone-800 rounded-2xl p-4 flex items-center justify-between mb-8 border border-[#A7F3D0] dark:border-stone-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
               <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-white dark:bg-stone-700 flex items-center justify-center shadow-sm">
                    <svg class="text-[#627EEA] dark:text-[#8ba2f5]" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 4-9 18-9-18Z"/><path d="m2 6 9 13 9-13"/></svg>
                  </div>
                  <div>
                     <h3 class="font-bold text-[#064E3B] dark:text-stone-100 text-lg">Ethereum Mainnet</h3>
                     <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-xs font-semibold text-green-700 dark:text-green-400">Active</span>
                     </div>
                  </div>
               </div>
               <svg class="text-[#059669] dark:text-[#10B981]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>

            <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">Available Networks</h3>
            <!-- Networks List -->
            <div class="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-6 mb-8 shadow-sm">
               <div class="flex items-center justify-between mb-6 group cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#F3BA2F] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">B</div>
                    <span class="font-medium text-stone-800 dark:text-stone-200">BNB Smart Chain</span>
                  </div>
                  <div class="w-12 h-7 bg-[#059669] dark:bg-[#10B981] rounded-full relative cursor-pointer transition-colors">
                     <div class="w-5 h-5 bg-white rounded-full absolute top-1 right-1 shadow-sm transition-transform"></div>
                  </div>
               </div>
               
               <div class="flex items-center justify-between mb-6 group cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#8247E5] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">P</div>
                    <span class="font-medium text-stone-800 dark:text-stone-200">Polygon</span>
                  </div>
                  <div class="w-12 h-7 bg-[#059669] dark:bg-[#10B981] rounded-full relative cursor-pointer transition-colors">
                     <div class="w-5 h-5 bg-white rounded-full absolute top-1 right-1 shadow-sm transition-transform"></div>
                  </div>
               </div>

               <div class="flex items-center justify-between mb-6 group cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-black dark:bg-stone-700 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">S</div>
                    <span class="font-medium text-stone-800 dark:text-stone-200">Solana</span>
                  </div>
                  <div class="w-12 h-7 bg-stone-200 dark:bg-stone-700 rounded-full relative cursor-pointer transition-colors hover:bg-stone-300 dark:hover:bg-stone-600">
                     <div class="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-sm transition-transform"></div>
                  </div>
               </div>

               <button (click)="openModal()" class="w-full border border-dashed border-[#059669] dark:border-[#10B981] text-[#059669] dark:text-[#10B981] py-4 rounded-xl font-medium text-sm hover:bg-[#D1FAE5] dark:hover:bg-stone-800 transition-colors">
                 + Add Custom Network
               </button>
            </div>
          </div>

          <!-- Column 2: Security & Privacy -->
          <div>
            <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">Security Settings</h3>
            <div class="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-2 mb-8 shadow-sm">
               <div class="flex items-center justify-between p-4 border-b border-stone-50 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer rounded-t-2xl">
                  <div class="flex items-center gap-4">
                     <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                     </div>
                     <div>
                       <p class="text-sm font-bold text-stone-800 dark:text-stone-200">2-Factor Authentication</p>
                       <p class="text-xs text-[#059669] dark:text-[#10B981] font-medium">Enabled</p>
                     </div>
                  </div>
                  <svg class="text-stone-300 dark:text-stone-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
               </div>

               <div class="flex items-center justify-between p-4 border-b border-stone-50 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                  <div class="flex items-center gap-4">
                     <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c0-3.5 2.5-6 6-6 1.5 0 2.5.5 3.5 1.5 1-1 2-1.5 3.5-1.5 3.5 0 6 2.5 6 6 0 4-3.5 7-7.5 7S2 16 2 12Z"/><path d="M12 12v6"/><path d="M12 18s-2 1.5-2 3.5"/><path d="M12 18s2 1.5 2 3.5"/><path d="M9 13s1.5 1 1.5 3"/><path d="M15 13s-1.5 1-1.5 3"/></svg>
                     </div>
                     <span class="text-sm font-bold text-stone-800 dark:text-stone-200">Biometric Login</span>
                  </div>
                  <div class="w-12 h-7 bg-[#059669] dark:bg-[#10B981] rounded-full relative cursor-pointer">
                     <div class="w-5 h-5 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                  </div>
               </div>

               <div class="flex items-center justify-between p-4 border-b border-stone-50 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                  <div class="flex items-center gap-4">
                     <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                     </div>
                     <span class="text-sm font-bold text-stone-800 dark:text-stone-200">Auto-lock Timer</span>
                  </div>
                  <div class="flex items-center gap-1 text-sm font-medium text-[#059669] dark:text-[#10B981] bg-[#D1FAE5] dark:bg-stone-800 px-3 py-1 rounded-lg">
                     5 min
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
               </div>

               <div class="flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer rounded-b-2xl">
                  <div class="flex items-center gap-4">
                     <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="4" x="4" y="4" rx="1"/><rect width="4" height="4" x="4" y="11" rx="1"/><rect width="4" height="4" x="4" y="18" rx="1"/><rect width="4" height="4" x="11" y="4" rx="1"/><rect width="4" height="4" x="11" y="11" rx="1"/><rect width="4" height="4" x="11" y="18" rx="1"/><rect width="4" height="4" x="18" y="4" rx="1"/><rect width="4" height="4" x="18" y="11" rx="1"/><rect width="4" height="4" x="18" y="18" rx="1"/></svg>
                     </div>
                     <span class="text-sm font-bold text-stone-800 dark:text-stone-200">Change PIN</span>
                  </div>
                  <svg class="text-stone-300 dark:text-stone-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
               </div>
            </div>

            <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">Privacy</h3>
            <div class="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-2 shadow-sm">
               <div class="flex items-center justify-between p-4 border-b border-stone-50 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer rounded-t-2xl">
                  <div class="flex items-center gap-4">
                     <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                     </div>
                     <span class="text-sm font-bold text-stone-800 dark:text-stone-200">Hide Small Balances</span>
                  </div>
                  <div class="w-12 h-7 bg-stone-200 dark:bg-stone-700 rounded-full relative cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors">
                     <div class="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-sm transition-transform"></div>
                  </div>
               </div>
               <div class="flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer rounded-b-2xl">
                  <div class="flex items-center gap-4">
                     <div class="bg-stone-100 dark:bg-stone-800 p-2 rounded-full text-stone-500 dark:text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                     </div>
                     <span class="text-sm font-bold text-stone-800 dark:text-stone-200">Share Usage Data</span>
                  </div>
                  <div class="w-12 h-7 bg-stone-200 dark:bg-stone-700 rounded-full relative cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors">
                     <div class="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-sm transition-transform"></div>
                  </div>
               </div>
            </div>
          </div>

       </div>

       <!-- Modal -->
       @if (showAddNetworkModal()) {
         <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
           <div class="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-stone-100 dark:border-stone-800">
             <h2 class="text-xl font-bold text-stone-900 dark:text-white mb-4">Add Custom Network</h2>
             
             <div class="space-y-4">
               <div>
                 <label class="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1">Network Name</label>
                 <input type="text" [(ngModel)]="newNetwork.name" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981]" placeholder="e.g. My Custom Chain" />
               </div>
               <div>
                 <label class="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1">RPC URL</label>
                 <input type="text" [(ngModel)]="newNetwork.rpcUrl" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981]" placeholder="https://..." />
               </div>
               <div>
                 <label class="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1">Chain ID</label>
                 <input type="text" [(ngModel)]="newNetwork.chainId" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981]" placeholder="e.g. 1337" />
               </div>
               <div>
                 <label class="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1">Currency Symbol</label>
                 <input type="text" [(ngModel)]="newNetwork.symbol" class="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#059669] dark:focus:border-[#10B981]" placeholder="e.g. ETH" />
               </div>
             </div>

             <div class="flex gap-3 mt-8">
               <button (click)="closeModal()" class="flex-1 py-3 rounded-xl font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">Cancel</button>
               <button (click)="saveNetwork()" class="flex-1 py-3 rounded-xl font-semibold bg-[#059669] dark:bg-[#10B981] text-white shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] transition-transform">Add Network</button>
             </div>
           </div>
         </div>
       }
    </div>
  `
})
export class SettingsComponent {
    themeService = inject(ThemeService);
    showAddNetworkModal = signal(false);
  
    newNetwork = {
      name: '',
      rpcUrl: '',
      chainId: '',
      symbol: ''
    };

    openModal() {
      this.showAddNetworkModal.set(true);
    }

    closeModal() {
      this.showAddNetworkModal.set(false);
      this.newNetwork = { name: '', rpcUrl: '', chainId: '', symbol: '' };
    }

    saveNetwork() {
      console.log('Saving network:', this.newNetwork);
      // Logic to save would go here
      this.closeModal();
    }
}