import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CacheService {
    /** Right now we will never invalidate any data, we will just keep storing more and more. */
    data: any = {};

    constructor() {}

    // Save data to localStorage with prefix
    save(key: string, value: any): void {
        this.data[key] = value;
    }

    // Read data from localStorage with prefix
    read<T>(key: string): T | null {
        return this.data[key];
    }

    // Remove data from localStorage with prefix
    remove(key: string): void {
        delete this.data[key];
    }

    // Clear all data from localStorage that matches the prefix
    clear(): void {
        this.data = {};
    }
}
