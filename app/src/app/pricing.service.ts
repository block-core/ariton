import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  constructor() {}

  getAnnualLevels() {
    return Object.values(this.levels).filter((level) => level.annual);
  }

  getMonthlyLevels() {
    return Object.values(this.levels).filter((level) => !level.annual);
  }

  getLevel(id: string) {
    return this.levels[id];
  }

  levels: { [key: string]: { id: string; annual: boolean; maxFee: number; maxMembers: number; cost: number } } = {
    'annual-premium': {
      id: 'premium',
      // name: 'Premium',
      annual: true,
      maxFee: 1000,
      maxMembers: 10000,
      cost: 450,
    },
    'annual-standard': {
      id: 'standard',
      // name: 'Standard',
      annual: true,
      maxFee: 100,
      maxMembers: 1000,
      cost: 280,
    },
    'annual-basic': {
      id: 'basic',
      // name: 'Basic',
      annual: true,
      maxFee: 10,
      maxMembers: 50,
      cost: 190,
    },
    'monthly-premium': {
      id: 'premium',
      // name: 'Premium',
      annual: false,
      maxFee: 1000,
      maxMembers: 10000,
      cost: 500,
    },
    'monthly-standard': {
      id: 'standard',
      // name: 'Standard',
      annual: false,
      maxFee: 100,
      maxMembers: 1000,
      cost: 300,
    },
    'monthly-basic': {
      id: 'basic',
      // name: 'Basic',
      annual: false,
      maxFee: 10,
      maxMembers: 50,
      cost: 200,
    },
  };
}
