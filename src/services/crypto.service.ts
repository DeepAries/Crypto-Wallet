import { Injectable, signal, computed } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  change24h: number;
  color: string;
  icon: string;
  network: string; // Added network property
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'failed';
  amount: string;
  amountUsd: string;
  asset: string;
  from?: string;
  to?: string;
  date: string;
  status: 'confirmed' | 'pending' | 'failed';
  fee?: string;
  network?: string;
  hash?: string;
}

export interface Wallet {
  id: string;
  name: string;
  address: string;
  type: 'main' | 'ledger' | 'watch';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  // Mock Data - Initial State
  readonly assets = signal<Asset[]>([
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.45, price: 42350.00, change24h: 1.2, color: '#F7931A', icon: '₿', network: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 2.85, price: 2230.50, change24h: 0.8, color: '#627EEA', icon: 'Ξ', network: 'Ethereum' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 124.5, price: 98.50, change24h: 5.4, color: '#14F195', icon: 'S', network: 'Solana' },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: 2459.35, price: 1.00, change24h: 0.0, color: '#26A17B', icon: 'T', network: 'Ethereum' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', balance: 5.2, price: 312.40, change24h: -0.5, color: '#F3BA2F', icon: 'B', network: 'BNB Chain' },
  ]);

  readonly wallets = signal<Wallet[]>([
    { id: '1', name: 'Main Wallet', address: '0x71C...9A21', type: 'main' },
    { id: '2', name: 'Ledger Nano X', address: '0x3a4...bb12', type: 'ledger' },
    { id: '3', name: 'Vault', address: '0x88e...11fa', type: 'watch' },
  ]);

  readonly notifications = signal<Notification[]>([
    { id: '1', title: 'Transaction Successful', message: 'Sent 2.0 ETH to Jane', time: '2m ago', read: false, type: 'success' },
    { id: '2', title: 'Price Alert', message: 'Bitcoin is up 5% today', time: '1h ago', read: false, type: 'info' },
    { id: '3', title: 'Security Alert', message: 'New login detected from Mac OS', time: '5h ago', read: true, type: 'alert' },
  ]);

  readonly transactions = signal<Transaction[]>([
    { id: '1', type: 'receive', amount: '+0.45 BTC', amountUsd: '+$12,450.00', asset: 'BTC', from: '0x3a...9f', date: 'Today, 10:23 AM', status: 'confirmed', fee: '0.00005 BTC', network: 'Bitcoin', hash: '8f7d...2a1b' },
    { id: '2', type: 'swap', amount: '-1.5 ETH', amountUsd: '+2,800 USDT', asset: 'ETH', date: 'Today, 08:45 AM', status: 'confirmed', fee: '0.0021 ETH', network: 'Ethereum', hash: '0x4e...9c2d' },
    { id: '3', type: 'send', amount: '-2.0 ETH', amountUsd: '-$3,750.00', asset: 'ETH', to: 'Jane (0x9b...2f)', date: 'Yesterday, 09:15 PM', status: 'confirmed', fee: '0.0018 ETH', network: 'Ethereum', hash: '0x1a...5f8e' },
    { id: '4', type: 'failed', amount: 'Smart Contract Call', amountUsd: '', asset: 'ETH', date: 'Yesterday, 04:30 PM', status: 'failed', fee: '0.004 ETH', network: 'Ethereum', hash: '0x7c...3b4a' },
    { id: '5', type: 'receive', amount: '+0.12 BTC', amountUsd: '+$3,320.00', asset: 'BTC', from: 'Binance', date: 'Oct 24, 02:15 PM', status: 'confirmed', fee: '0.0001 BTC', network: 'Bitcoin', hash: '3d2f...9a1c' },
  ]);

  readonly totalBalance = computed(() => {
    return this.assets().reduce((acc, asset) => acc + (asset.balance * asset.price), 0);
  });

  readonly activeWallet = signal<Wallet>(this.wallets()[0]);

  readonly isAuthenticated = signal(false);
  readonly biometricEnabled = signal(false);
  readonly isUpdating = signal(false);

  login() {
    this.isAuthenticated.set(true);
  }

  logout() {
    this.isAuthenticated.set(false);
  }

  setActiveWallet(wallet: Wallet) {
    this.activeWallet.set(wallet);
  }

  markAllNotificationsRead() {
    this.notifications.update(ns => ns.map(n => ({ ...n, read: true })));
  }

  async enrollBiometrics(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.biometricEnabled.set(true);
        resolve(true);
      }, 1500);
    });
  }

  async updateMarketRates() {
    if (this.isUpdating()) return;
    this.isUpdating.set(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });
      
      const prompt = `
        Search for the current live market price in USD and the 24h percentage change for the following cryptocurrencies:
        Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Tether (USDT), and BNB.
        
        Return the data strictly as a JSON array of objects. 
        Each object must have these exact keys: "symbol" (string, e.g. "BTC"), "price" (number), "change24h" (number).
        Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }] // Enable Google Search Grounding
        }
      });

      const text = response.text;
      console.log('Gemini Response:', text);
      
      // Clean up response if it contains markdown code blocks
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        const liveRates = JSON.parse(cleanJson);
        
        if (Array.isArray(liveRates)) {
          this.assets.update(currentAssets => {
            return currentAssets.map(asset => {
              const liveData = liveRates.find((r: any) => r.symbol?.toUpperCase() === asset.symbol.toUpperCase());
              if (liveData) {
                return {
                  ...asset,
                  price: liveData.price,
                  change24h: liveData.change24h
                };
              }
              return asset;
            });
          });
        }
      } catch (e) {
        console.error('Failed to parse GenAI response:', e);
      }

    } catch (error) {
      console.error('Error fetching market rates:', error);
    } finally {
      this.isUpdating.set(false);
    }
  }
}