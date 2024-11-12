import { Component, OnInit, OnDestroy } from '@angular/core';
import { NostrEvent, Filter } from 'nostr-tools';
import { EventService } from '../../../services/nostr/event.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AgoPipe } from '../../../shared/pipes/ago.pipe';

@Component({
  selector: 'app-nostr',
  templateUrl: './nostr.component.html',
  styleUrls: ['./nostr.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule,
    AgoPipe
  ]
})
export class NostrComponent implements OnInit, OnDestroy {
  public events: NostrEvent[] = [];
  public metadata: { name: string; picture: string } | null = null;
  public loading = true;

  private readonly pubKey = '5f432a9f39b58ff132fc0a4c8af10d42efd917d8076f68bb7f2f91ed7d4f6a41';
  private eventSubscriptionId: string | null = null;
  private eventsSubscription: Subscription | null = null;

  constructor(private readonly eventService: EventService) { }

  ngOnInit(): void {
    this.subscribeToEvents();
    this.fetchMetadata(this.pubKey);
  }

  ngOnDestroy(): void {
    this.unsubscribeFromEvents();
  }

  private subscribeToEvents(): void {
    const filter: Filter = {
      kinds: [1],
      authors: [this.pubKey],
      limit: 10,
    };

    this.eventSubscriptionId = this.eventService.addEventSubscription([filter], (event: NostrEvent) => {
      this.events = [event, ...this.events].sort((a, b) => b.created_at - a.created_at);
    });

    this.eventsSubscription = this.eventService.events$.subscribe(eventMap => {
      console.log('Event subscriptions updated:', Array.from(eventMap.values()));
    });

    this.loading = false;
  }

  private async fetchMetadata(pubkey: string): Promise<void> {
    const filter: Filter = { kinds: [0], authors: [pubkey] };
    this.eventService.addEventSubscription([filter], (metadataEvent: NostrEvent) => {
      try {
        this.metadata = JSON.parse(metadataEvent.content);
      } catch (error) {
        console.error('Error parsing metadata:', error);
      }
    });
  }

  private unsubscribeFromEvents(): void {
    if (this.eventSubscriptionId) {
      this.eventService.removeEventSubscriptionById(this.eventSubscriptionId);
    }
    this.eventsSubscription?.unsubscribe();
  }

  public clearEvents(): void {
    this.events = [];
    this.eventService.clearAllEventSubscriptions();
    console.log('Cleared all event subscriptions and local events list');
  }
}
