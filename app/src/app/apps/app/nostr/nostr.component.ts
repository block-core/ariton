import { Component, OnInit, OnDestroy } from '@angular/core';
import { NostrEvent, Filter } from 'nostr-tools';
import { EventService } from '../../../services/nostr/event.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nostr',
  templateUrl: './nostr.component.html',
  styleUrls: ['./nostr.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NostrComponent implements OnInit, OnDestroy {
  public events: NostrEvent[] = [];
  private pubKey = '5f432a9f39b58ff132fc0a4c8af10d42efd917d8076f68bb7f2f91ed7d4f6a41';
  private eventSubscriptionId: string | null = null;
  private eventsSubscription: Subscription | null = null;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    console.log('Initializing NostrComponent');
    this.subscribeToEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriptionId) {
      this.eventService.removeEventSubscriptionById(this.eventSubscriptionId);
      console.log(`Unsubscribed from events with ID: ${this.eventSubscriptionId}`);
    }
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  private subscribeToEvents(): void {
    const filter: Filter = {
      kinds: [1],
      authors: [this.pubKey],
      limit: 10,
    };

    this.eventSubscriptionId = this.eventService.addEventSubscription([filter], (event: NostrEvent) => {
      this.events.push(event);
      console.log('New event received:', event);
    });

    this.eventsSubscription = this.eventService.events$.subscribe(eventMap => {
      console.log('Event subscriptions updated:', Array.from(eventMap.values()));
    });
  }

  public clearEvents(): void {
    this.events = [];
    this.eventService.clearAllEventSubscriptions();
    console.log('Cleared all event subscriptions and local events list');
  }
}
