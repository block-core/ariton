import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class CacheService {
  /** Data storage with TTL */
  data: { [key: string]: { value: any; expiration: number } } = {};

  constructor() {}

  // Save data with optional TTL in milliseconds
  save(key: string, value: any, ttl?: number): void {
    const expiration = ttl ? Date.now() + ttl : Infinity;
    this.data[key] = { value, expiration };
  }

  // Read data and check for expiration
  read<T>(key: string): T | null {
    const entry = this.data[key];
    if (!entry) {
      return null;
    }
    if (entry.expiration < Date.now()) {
      delete this.data[key];
      return null;
    }
    return entry.value;
  }

  // Remove data from storage
  remove(key: string): void {
    delete this.data[key];
  }

  // Clear all data
  clear(): void {
    this.data = {};
  }
}
