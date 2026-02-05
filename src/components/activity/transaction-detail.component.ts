import { Component, inject, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 pt-8 pb-24 md:pb-10 min-h-full max-w-2xl mx-auto flex flex-col">
       <!-- Header -->
       <div class="flex items-center gap-4 mb-8">
          <button (click)="goBack()" class="p-2 -ml-2 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 class="text-xl font-bold text-stone-900 dark:text-white">Transaction Details</h1>
       </div>

       @if (transaction(); as tx) {
         <div class="bg-white dark:bg-stone-900 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800 p-8 flex flex-col items-center animate-fade-in">
            
            <!-- Icon -->
            <div class="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm"
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
                 [class.dark:text-red-400]="tx.type === 'send' || tx.type === 'failed'">
                @if(tx.type === 'receive') { <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg> }
                @if(tx.type === 'send') { <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> }
                @if(tx.type === 'swap') { <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 21-4.5-4.5 4.5-4.5"/><path d="m3 16.5h13.5"/><path d="m16.5 3 4.5 4.5-4.5 4.5"/><path d="m21 7.5H7.5"/></svg> }
                @if(tx.type === 'failed') { <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg> }
            </div>

            <!-- Main Amount -->
            <h2 class="text-3xl font-bold text-stone-900 dark:text-white mb-2 text-center">{{ tx.amount }}</h2>
            @if(tx.amountUsd) {
              <p class="text-stone-500 dark:text-stone-400 font-medium mb-4">{{ tx.amountUsd }}</p>
            }

            <!-- Status -->
            <div class="px-4 py-1.5 rounded-full text-sm font-bold capitalize mb-8"
                 [class.bg-green-100]="tx.status === 'confirmed'"
                 [class.dark:bg-green-900]="tx.status === 'confirmed'"
                 [class.text-green-700]="tx.status === 'confirmed'"
                 [class.dark:text-green-400]="tx.status === 'confirmed'"
                 [class.bg-yellow-100]="tx.status === 'pending'"
                 [class.text-yellow-700]="tx.status === 'pending'"
                 [class.bg-red-100]="tx.status === 'failed'"
                 [class.dark:bg-red-900]="tx.status === 'failed'"
                 [class.text-red-700]="tx.status === 'failed'"
                 [class.dark:text-red-400]="tx.status === 'failed'">
               {{ tx.status }}
            </div>

            <!-- Details List -->
            <div class="w-full space-y-4">
               <div class="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                  <span class="text-stone-500 dark:text-stone-400 font-medium">Date</span>
                  <span class="text-stone-900 dark:text-stone-200 font-semibold">{{ tx.date }}</span>
               </div>
               
               @if(tx.network) {
                 <div class="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                    <span class="text-stone-500 dark:text-stone-400 font-medium">Network</span>
                    <span class="text-stone-900 dark:text-stone-200 font-semibold">{{ tx.network }}</span>
                 </div>
               }

               @if(tx.fee) {
                 <div class="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                    <span class="text-stone-500 dark:text-stone-400 font-medium">Network Fee</span>
                    <span class="text-stone-900 dark:text-stone-200 font-semibold">{{ tx.fee }}</span>
                 </div>
               }

               @if(tx.from) {
                 <div class="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                    <span class="text-stone-500 dark:text-stone-400 font-medium">From</span>
                    <div class="flex items-center gap-2">
                       <span class="text-stone-900 dark:text-stone-200 font-semibold truncate max-w-[150px]">{{ tx.from }}</span>
                       <button class="text-[#059669] dark:text-[#10B981]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
                    </div>
                 </div>
               }

               @if(tx.to) {
                 <div class="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                    <span class="text-stone-500 dark:text-stone-400 font-medium">To</span>
                    <div class="flex items-center gap-2">
                       <span class="text-stone-900 dark:text-stone-200 font-semibold truncate max-w-[150px]">{{ tx.to }}</span>
                       <button class="text-[#059669] dark:text-[#10B981]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
                    </div>
                 </div>
               }

               @if(tx.hash) {
                 <div class="flex justify-between items-center py-3">
                    <span class="text-stone-500 dark:text-stone-400 font-medium">Transaction ID</span>
                    <div class="flex items-center gap-2">
                       <span class="text-stone-900 dark:text-stone-200 font-mono font-medium truncate max-w-[150px]">{{ tx.hash }}</span>
                       <button class="text-[#059669] dark:text-[#10B981]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
                    </div>
                 </div>
               }
            </div>

            <a href="#" class="mt-8 text-[#059669] dark:text-[#10B981] font-semibold text-sm hover:underline flex items-center gap-1">
               View on Block Explorer
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            </a>
         </div>
       } @else {
         <div class="flex flex-col items-center justify-center py-20 text-stone-500 dark:text-stone-400">
            <p>Transaction not found.</p>
            <button (click)="goBack()" class="mt-4 text-[#059669] dark:text-[#10B981] font-semibold">Go Back</button>
         </div>
       }
    </div>
  `
})
export class TransactionDetailComponent {
  private route = inject(ActivatedRoute);
  private cryptoService = inject(CryptoService);
  private location = inject(Location);

  transaction = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return this.cryptoService.transactions().find(t => t.id === id);
  });

  goBack() {
    this.location.back();
  }
}