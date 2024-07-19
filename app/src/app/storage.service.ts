import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private prefix = 'ariton-'; // Prefix for all keys

  constructor() {}

  // Save data to localStorage with prefix
  save(key: string, value: any): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  // Read data from localStorage with prefix
  read<T>(key: string): T | null {
    const item = localStorage.getItem(this.prefix + key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }

  // Remove data from localStorage with prefix
  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  // Clear all data from localStorage that matches the prefix
  clear(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}
