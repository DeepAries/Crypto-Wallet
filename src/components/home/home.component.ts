import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CryptoService, Asset } from '../../services/crypto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="p-6 pt-10 pb-24 md:pb-10 max-w-6xl mx-auto relative">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8 md:mb-12 relative z-20">
        <!-- Wallet Selector -->
        <div class="relative">
            <div class="flex items-center gap-3 cursor-pointer p-2 -ml-2 hover:bg-white dark:hover:bg-stone-800 rounded-xl transition-colors" (click)="toggleWalletDropdown()">
                <img src="https://picsum.photos/100/100" alt="Avatar" class="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 md:hidden" />
                <div class="flex items-center gap-1 text-stone-800 dark:text-stone-100 font-semibold text-lg md:text-2xl">
                    <span class="hidden md:inline text-stone-500 dark:text-stone-400 mr-2">Welcome back,</span> 
                    {{ cryptoService.activeWallet().name }}
                    <svg class="transition-transform duration-200" [class.rotate-180]="showWalletDropdown()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
            </div>
            
            <!-- Wallet Dropdown -->
            @if (showWalletDropdown()) {
                <div class="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-800 p-2 animate-fade-in">
                    @for (wallet of cryptoService.wallets(); track wallet.id) {
                        <button (click)="selectWallet(wallet)" class="w-full text-left p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-between group">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#059669] dark:text-[#10B981] group-hover:bg-[#D1FAE5] dark:group-hover:bg-stone-700 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                </div>
                                <div>
                                    <div class="font-bold text-stone-900 dark:text-white text-sm">{{ wallet.name }}</div>
                                    <div class="text-xs text-stone-500 truncate w-24">{{ wallet.address }}</div>
                                </div>
                            </div>
                            @if (cryptoService.activeWallet().id === wallet.id) {
                                <svg class="text-green-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            }
                        </button>
                    }
                    <div class="h-px bg-stone-100 dark:bg-stone-800 my-2"></div>
                    <button class="w-full text-left p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-sm font-semibold text-[#059669] dark:text-[#10B981] flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="5 12 12 5 19 12"/></svg>
                        Add New Wallet
                    </button>
                </div>
            }
        </div>

        <!-- Right Controls -->
        <div class="flex gap-4 text-stone-600 dark:text-stone-400 relative z-30">
           <!-- Notifications -->
           <div class="relative">
               <button (click)="toggleNotifications()" class="relative p-2 hover:bg-white dark:hover:bg-stone-800 rounded-full transition-colors z-30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                  @if (unreadCount() > 0) {
                      <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F2F5F4] dark:border-stone-900 animate-pulse"></span>
                  }
               </button>
               
               @if (showNotificationPanel()) {
                 <div class="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden animate-fade-in z-40">
                    <div class="p-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                        <h3 class="font-bold text-stone-900 dark:text-white">Notifications</h3>
                        <button (click)="cryptoService.markAllNotificationsRead()" class="text-xs text-[#059669] dark:text-[#10B981] hover:underline">Mark all read</button>
                    </div>
                    <div class="max-h-80 overflow-y-auto">
                        @for (notif of cryptoService.notifications(); track notif.id) {
                            <div class="p-4 border-b border-stone-50 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" [class.bg-orange-50]="!notif.read && notif.type === 'alert'" [class.dark:bg-orange-900/10]="!notif.read && notif.type === 'alert'">
                                <div class="flex gap-3">
                                    <div class="mt-1" [ngClass]="{
                                        'text-green-500': notif.type === 'success',
                                        'text-blue-500': notif.type === 'info',
                                        'text-red-500': notif.type === 'alert'
                                    }">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-semibold text-stone-900 dark:text-stone-100">{{ notif.title }}</h4>
                                        <p class="text-xs text-stone-500 dark:text-stone-400 leading-snug">{{ notif.message }}</p>
                                        <span class="text-[10px] text-stone-400 mt-1 block">{{ notif.time }}</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                 </div>
               }
           </div>

           <!-- Scanner -->
           <button (click)="openScanModal()" class="p-2 hover:bg-white dark:hover:bg-stone-800 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M16 16h1.3a2 2 0 0 1 2 2v1.3"/><path d="M16 21c0-1.1.9-2 2-2h1.3"/></svg>
           </button>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
        <!-- Balance Section -->
        <div class="flex-1 bg-white dark:bg-stone-900 md:bg-transparent md:dark:bg-transparent p-6 md:p-0 rounded-3xl md:rounded-none shadow-sm md:shadow-none border border-stone-100 dark:border-stone-800 md:border-none">
          <p class="text-stone-500 dark:text-stone-400 text-sm md:text-base font-medium mb-1">Total Balance</p>
          <div class="flex items-baseline gap-4 flex-wrap">
             <h1 class="text-4xl md:text-6xl font-bold text-stone-900 dark:text-white tracking-tight">{{ cryptoService.totalBalance() | currency }}</h1>
             <div class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-semibold">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
               2.45% (+$562.10)
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between md:justify-start md:gap-8 px-2 md:px-0">
          <div class="flex flex-col items-center gap-2 cursor-pointer group" (click)="openSendModal()">
             <button class="w-14 h-14 md:w-16 md:h-16 bg-[#059669] dark:bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
             </button>
             <span class="text-xs md:text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[#059669] dark:group-hover:text-[#10B981]">Send</span>
          </div>
          <div class="flex flex-col items-center gap-2 cursor-pointer group" (click)="openReceiveModal()">
             <button class="w-14 h-14 md:w-16 md:h-16 bg-[#059669] dark:bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
             </button>
             <span class="text-xs md:text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[#059669] dark:group-hover:text-[#10B981]">Receive</span>
          </div>
          <div class="flex flex-col items-center gap-2 cursor-pointer group">
             <button routerLink="/swap" class="w-14 h-14 md:w-16 md:h-16 bg-[#059669] dark:bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>
             </button>
             <span class="text-xs md:text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[#059669] dark:group-hover:text-[#10B981]">Swap</span>
          </div>
          <div class="flex flex-col items-center gap-2 cursor-pointer group" (click)="openBuyModal()">
             <button class="w-14 h-14 md:w-16 md:h-16 bg-[#059669] dark:bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
             </button>
             <span class="text-xs md:text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[#059669] dark:group-hover:text-[#10B981]">Buy</span>
          </div>
        </div>
      </div>

      <!-- Chain Filter -->
      <div class="flex gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
         @for (chain of chains; track chain) {
            <button (click)="setActiveChain(chain)"
               [class]="activeChain() === chain ? 'bg-[#D1FAE5] dark:bg-stone-800 text-[#059669] dark:text-[#10B981] shadow-sm' : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-[#059669] dark:hover:border-[#10B981] hover:text-[#059669] dark:hover:text-[#10B981]'"
               class="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors">
               {{ chain }}
            </button>
         }
      </div>

      <!-- Assets List -->
      <div class="flex justify-between items-center mb-6">
         <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-stone-900 dark:text-white">Your Assets</h2>
            <button (click)="cryptoService.updateMarketRates()" [disabled]="cryptoService.isUpdating()" class="p-1.5 rounded-lg text-stone-400 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-stone-100 dark:hover:bg-stone-800 transition-all" title="Refresh Live Rates">
               <svg [class.animate-spin]="cryptoService.isUpdating()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
            </button>
         </div>
         <button routerLink="/wallet" class="text-[#059669] dark:text-[#10B981] text-sm font-semibold hover:underline">See All</button>
      </div>

      <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        @for (asset of filteredAssets(); track asset.id) {
          <div (click)="openAssetDetails(asset)" class="flex items-center justify-between p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
             <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm" [style.background-color]="asset.color">
                   {{ asset.icon }}
                </div>
                <div>
                   <h3 class="font-bold text-stone-900 dark:text-stone-100 text-lg">{{ asset.name }}</h3>
                   <span class="text-sm text-stone-400 font-medium">{{ asset.symbol }}</span>
                </div>
             </div>
             <div class="text-right">
                <h4 class="font-bold text-stone-900 dark:text-stone-100 text-lg">{{ asset.price | currency }}</h4>
                <span class="text-sm font-medium" [class.text-green-500]="asset.change24h >= 0" [class.text-green-400]="asset.change24h >= 0" [class.text-red-500]="asset.change24h < 0">
                  {{ asset.change24h >= 0 ? '+' : '' }}{{ asset.change24h }}%
                </span>
             </div>
          </div>
        }
      </div>
      
      <!-- MODALS -->
      @if (showScanModal()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
             <div class="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-sm overflow-hidden relative">
                <div class="h-96 bg-stone-900 relative flex flex-col items-center justify-center">
                   <p class="text-white/70 text-sm mb-4">Scanning...</p>
                   <div class="w-64 h-64 border-2 border-white/50 rounded-2xl relative">
                      <div class="absolute inset-0 border-2 border-[#059669] animate-pulse rounded-2xl"></div>
                   </div>
                   <button (click)="closeScanModal()" class="absolute top-4 right-4 text-white hover:text-[#059669]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
                </div>
                <div class="p-6 text-center">
                   <p class="text-stone-600 dark:text-stone-300 text-sm">Scan a QR code to send funds or connect a wallet.</p>
                </div>
             </div>
          </div>
      }

      @if (showSendModal()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
             <div class="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-stone-100 dark:border-stone-800">
                <div class="flex justify-between items-center mb-6">
                   <h2 class="text-xl font-bold text-stone-900 dark:text-white">Send Assets</h2>
                   <button (click)="closeModals()" class="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><svg class="text-stone-500 dark:text-stone-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
                </div>
                
                <div class="space-y-4">
                   <div class="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl">
                      <label class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block">Asset</label>
                      <select [(ngModel)]="selectedAssetId" class="w-full bg-transparent font-bold text-stone-900 dark:text-white text-lg focus:outline-none">
                         @for(asset of cryptoService.assets(); track asset.id) {
                            <option [value]="asset.id">{{ asset.name }} ({{ asset.symbol }})</option>
                         }
                      </select>
                   </div>
                   <div>
                       <label class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 block">Address</label>
                       <div class="flex gap-2">
                           <input type="text" placeholder="0x..." class="flex-1 bg-stone-50 dark:bg-stone-800 border border-transparent focus:border-[#059669] rounded-xl px-4 py-3 text-stone-900 dark:text-white focus:outline-none transition-all" />
                           <button class="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 p-3 rounded-xl transition-colors">
                               <svg class="text-stone-600 dark:text-stone-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M16 16h1.3a2 2 0 0 1 2 2v1.3"/><path d="M16 21c0-1.1.9-2 2-2h1.3"/></svg>
                           </button>
                       </div>
                   </div>
                   <div>
                       <label class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 block">Amount</label>
                       <input type="number" placeholder="0.00" class="w-full bg-stone-50 dark:bg-stone-800 border border-transparent focus:border-[#059669] rounded-xl px-4 py-3 text-stone-900 dark:text-white focus:outline-none transition-all font-mono" />
                   </div>
                </div>
                
                <button (click)="closeModals()" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-bold py-4 rounded-xl mt-8 shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] transition-transform">
                   Send Transaction
                </button>
             </div>
          </div>
      }

      @if (showReceiveModal()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
             <div class="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-sm p-8 shadow-2xl relative border border-stone-100 dark:border-stone-800 text-center">
                 <button (click)="closeModals()" class="absolute top-4 right-4 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><svg class="text-stone-500 dark:text-stone-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
                 
                 <h2 class="text-xl font-bold text-stone-900 dark:text-white mb-6">Receive Assets</h2>
                 <div class="w-48 h-48 bg-white p-2 rounded-xl mx-auto mb-6 shadow-inner border border-stone-200">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x71C837239A21" alt="QR Code" class="w-full h-full object-contain mix-blend-multiply" />
                 </div>
                 <p class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">Wallet Address</p>
                 <div class="bg-stone-100 dark:bg-stone-800 rounded-xl p-3 flex items-center justify-between gap-2 mb-4">
                    <span class="text-xs font-mono text-stone-800 dark:text-stone-200 truncate">0x71C8...9A21</span>
                    <button class="text-[#059669] dark:text-[#10B981] font-semibold text-xs">Copy</button>
                 </div>
                 <p class="text-xs text-stone-400">Send only supported assets to this address.</p>
             </div>
          </div>
      }

      @if (showBuyModal()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
             <div class="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-stone-100 dark:border-stone-800">
                 <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-stone-900 dark:text-white">Buy Crypto</h2>
                    <button (click)="closeModals()" class="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><svg class="text-stone-500 dark:text-stone-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
                 </div>

                 <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="border border-stone-200 dark:border-stone-700 rounded-xl p-4 hover:border-[#059669] cursor-pointer transition-colors text-center">
                        <div class="font-bold text-stone-900 dark:text-white mb-1">MoonPay</div>
                        <div class="text-xs text-stone-500">Credit Card</div>
                    </div>
                    <div class="border border-stone-200 dark:border-stone-700 rounded-xl p-4 hover:border-[#059669] cursor-pointer transition-colors text-center">
                        <div class="font-bold text-stone-900 dark:text-white mb-1">Stripe</div>
                        <div class="text-xs text-stone-500">Bank Transfer</div>
                    </div>
                 </div>

                 <label class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 block">Amount (USD)</label>
                 <input type="number" placeholder="100.00" class="w-full bg-stone-50 dark:bg-stone-800 border border-transparent focus:border-[#059669] rounded-xl px-4 py-3 text-stone-900 dark:text-white focus:outline-none transition-all font-mono mb-6" />

                 <button (click)="closeModals()" class="w-full bg-[#059669] dark:bg-[#10B981] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20 hover:scale-[1.02] transition-transform">
                   Continue to Provider
                 </button>
             </div>
          </div>
      }

      @if (showAssetDetail() && selectedAsset()) {
         <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
             <div class="bg-white dark:bg-stone-900 rounded-[2rem] w-full max-w-sm p-8 shadow-2xl relative border border-stone-100 dark:border-stone-800 flex flex-col items-center">
                 <button (click)="closeModals()" class="absolute top-4 right-4 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"><svg class="text-stone-500 dark:text-stone-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
                 
                 <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-4" [style.background-color]="selectedAsset()!.color">
                    {{ selectedAsset()!.icon }}
                 </div>
                 
                 <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-1">{{ selectedAsset()!.name }}</h2>
                 <p class="text-stone-500 dark:text-stone-400 font-medium mb-6">{{ selectedAsset()!.network }} Network</p>

                 <div class="w-full bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 mb-8 text-center">
                    <p class="text-xs text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider mb-2">Your Balance</p>
                    <div class="text-3xl font-bold text-stone-900 dark:text-white tracking-tight mb-1">{{ (selectedAsset()!.balance * selectedAsset()!.price) | currency }}</div>
                    <div class="text-sm font-medium text-stone-500">{{ selectedAsset()!.balance }} {{ selectedAsset()!.symbol }}</div>
                 </div>

                 <div class="flex gap-4 w-full">
                    <button (click)="openSendModal()" class="flex-1 bg-[#059669] dark:bg-[#10B981] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#059669]/20 dark:shadow-[#10B981]/20">Send</button>
                    <button (click)="openReceiveModal()" class="flex-1 bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 font-bold py-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700">Receive</button>
                 </div>
             </div>
         </div>
      }
    </div>
  `
})
export class HomeComponent {
  cryptoService = inject(CryptoService);
  
  // UI State Signals
  activeChain = signal<string>('All Chains');
  showWalletDropdown = signal(false);
  showNotificationPanel = signal(false);
  showScanModal = signal(false);
  showSendModal = signal(false);
  showReceiveModal = signal(false);
  showBuyModal = signal(false);
  showAssetDetail = signal(false);
  
  selectedAsset = signal<Asset | null>(null);
  selectedAssetId = '';

  chains = ['All Chains', 'Ethereum', 'Bitcoin', 'Solana', 'BNB Chain'];

  // Computed Properties
  filteredAssets = computed(() => {
    const chain = this.activeChain();
    if (chain === 'All Chains') return this.cryptoService.assets();
    return this.cryptoService.assets().filter(a => a.network === chain);
  });

  unreadCount = computed(() => {
    return this.cryptoService.notifications().filter(n => !n.read).length;
  });

  // Methods
  setActiveChain(chain: string) {
    this.activeChain.set(chain);
  }

  toggleWalletDropdown() {
    this.showWalletDropdown.update(v => !v);
    this.showNotificationPanel.set(false);
  }

  selectWallet(wallet: any) {
    this.cryptoService.setActiveWallet(wallet);
    this.showWalletDropdown.set(false);
  }

  toggleNotifications() {
    this.showNotificationPanel.update(v => !v);
    this.showWalletDropdown.set(false);
  }

  openScanModal() { this.showScanModal.set(true); }
  closeScanModal() { this.showScanModal.set(false); }

  openSendModal() { 
    this.selectedAssetId = this.selectedAsset()?.id || this.cryptoService.assets()[0].id;
    this.closeModals(); 
    this.showSendModal.set(true); 
  }
  
  openReceiveModal() { 
    this.closeModals(); 
    this.showReceiveModal.set(true); 
  }
  
  openBuyModal() { 
    this.closeModals(); 
    this.showBuyModal.set(true); 
  }

  openAssetDetails(asset: Asset) {
    this.selectedAsset.set(asset);
    this.showAssetDetail.set(true);
  }

  closeModals() {
    this.showSendModal.set(false);
    this.showReceiveModal.set(false);
    this.showBuyModal.set(false);
    this.showAssetDetail.set(false);
    this.showScanModal.set(false);
  }
}