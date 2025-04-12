import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter, NostrEvent } from 'nostr-tools';
import { RelayService } from './relay.service';
import { v4 as uuidv4 } from 'uuid';

interface EventSubscription {
  filter: Filter[];
  callbacks: ((event: NostrEvent) => void)[];
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subscriptions = new Map<string, EventSubscription>();
  private activeRelays: string[] = [];
  private pendingSubscriptions = new Map<string, EventSubscription>();
  private eventsSubject = new BehaviorSubject<Map<string, EventSubscription>>(new Map());

  public events$: Observable<Map<string, EventSubscription>> = this.eventsSubject.asObservable();

  private subscriptionQueue: EventSubscription[] = [];
  private isProcessingQueue = false;
  private queueInterval = 3000;
  private maxSubscriptionsPerBatch = 5;
  private debounceInterval = 5000;
  private lastActionTimestamp = new Map<string, number>();

  constructor(private relayService: RelayService) {
    this.connectToAllRelays();
    this.processSubscriptionQueue();
  }

  public addEventSubscription(filters: Filter[], callback: (event: NostrEvent) => void): string {
    console.log('Adding event subscription with filters:', filters);
    const existingSubscription = this.findExistingSubscription(filters);

    if (existingSubscription) {
      existingSubscription.callbacks.push(callback);
      console.log('Found existing subscription:', existingSubscription.id);
      return existingSubscription.id;
    }

    const subscriptionId = uuidv4();
    this.lastActionTimestamp.set(subscriptionId, Date.now());

    const subscription: EventSubscription = { filter: filters, callbacks: [callback], id: subscriptionId };
    this.subscriptions.set(subscription.id, subscription);
    this.eventsSubject.next(this.subscriptions);
    this.addToQueue(subscription);

    console.log('New subscription added with ID:', subscriptionId);
    return subscriptionId;
  }


  private findExistingSubscription(filters: Filter[]): EventSubscription | undefined {
    return Array.from(this.subscriptions.values()).find(subscription =>
      JSON.stringify(subscription.filter) === JSON.stringify(filters)
    );
  }

  public removeEventSubscriptionById(subscriptionId: string): void {
    const now = Date.now();
    const lastActionTime = this.lastActionTimestamp.get(subscriptionId);

    if (lastActionTime && now - lastActionTime < this.debounceInterval) {
      return;
    }

    if (this.subscriptions.delete(subscriptionId)) {
      this.eventsSubject.next(this.subscriptions);
    }

    this.lastActionTimestamp.set(subscriptionId, now);
  }

  private addToQueue(subscription: EventSubscription): void {
    this.subscriptionQueue.push(subscription);
  }

  private processSubscriptionQueue(): void {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    const processQueue = () => {
      if (this.subscriptionQueue.length > 0) {
        const subscriptionsBatch = this.subscriptionQueue.splice(0, this.maxSubscriptionsPerBatch);
        subscriptionsBatch.forEach(subscription => this.subscribeToRelays(subscription.filter, subscription));
      }
    };

    setInterval(processQueue, this.queueInterval);
  }

  private subscribeToRelays(filters: Filter[], subscription: EventSubscription): void {
    if (this.activeRelays.length === 0) {
      console.log('No active relays. Adding to pending subscriptions.');
      this.pendingSubscriptions.set(subscription.id, subscription);
      return;
    }

    this.relayService.ensureConnectedRelays().then(() => {
      const connectedRelays = this.relayService.getConnectedRelays();
      this.relayService.getPool().subscribeMany(connectedRelays, filters, {
        onevent: (event: NostrEvent) => {
          console.log('Event received from relay:', event);
          subscription.callbacks.forEach(callback => callback(event));
        },
        onclose: () => console.log('Event subscription closed'),
      });
    }).catch(error => {
      console.error('Error subscribing to relays:', error);
    });
  }


  private subscribeToAllRelays(): void {
    this.pendingSubscriptions.forEach(subscription => {
      this.subscribeToRelays(subscription.filter, subscription);
    });
    this.pendingSubscriptions.clear();
  }

  private connectToAllRelays(): void {
    this.relayService.ensureConnectedRelays().then(() => {
      this.activeRelays = this.relayService.getConnectedRelays();
      this.subscribeToAllRelays();
    }).catch(error => {
      console.error('Error connecting to relays:', error);
    });
  }

  public clearAllEventSubscriptions(): void {
    this.subscriptions.clear();
    this.pendingSubscriptions.clear();
    this.eventsSubject.next(new Map());
  }

  public getEventSubscriptions(): EventSubscription[] {
    return Array.from(this.subscriptions.values());
  }
}
