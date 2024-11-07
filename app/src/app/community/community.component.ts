import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AgoPipe } from '../shared/pipes/ago.pipe';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { SizePipe } from '../shared/pipes/size.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../app.service';
import { LayoutService } from '../layout.service';
import { DataService } from '../data.service';
import { RecordEntry } from '../data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileHeaderComponent } from '../shared/components/profile-header/profile-header.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    MatInputModule,
    MatToolbarModule,
    SizePipe,
    CommonModule,
    MatListModule,
    RouterModule,
    AgoPipe,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ProfileHeaderComponent,
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {
  images = ['nature', 'sky', 'grass', 'mountains', 'rivers', 'glacier', 'forest', 'streams', 'rain', 'clouds'];

  photos = signal<any[]>([]);

  app = inject(AppService);

  layout = inject(LayoutService);

  route = inject(ActivatedRoute);

  data = inject(DataService);

  selectedCommunity = signal<string | null>(null);

  community = signal<RecordEntry<any> | null>(null);

  constructor() {
    effect(async () => {
      if (this.app.initialized() && this.selectedCommunity()) {
        await this.loadCommunity();
      }
    });
  }

  ngOnInit() {
    this.layout.marginOff();

    this.route.paramMap.subscribe((params) => {
      this.layout.resetActions();

      const id = params.get('id');

      console.log('Loading community: ', id);

      if (!id || id == ':id' || id == 'home') {
        this.selectedCommunity.set(null);
      } else {
        this.selectedCommunity.set(params.get('id'));
      }
    });

    const photos: any[] = [];
    for (let i = 0; i < this.images.length; i++) {
      photos.push({
        id: 'id' + 1,
        name: `Community ${i + 1}`,
        description: `This is a description of community. We are a great community with many members.`,
        thumbnail: `https://picsum.photos/seed/${this.images[i]}x/200/300`,
        private: false,
        visibility: 'public',
        type: 'generic',
        features: {
          discussion: true,
          members: true,
          events: true,
          media: true,
          files: true,
        },
        apps: ['events', 'media', 'files'],
      });
    }

    this.photos.set(photos);
  }

  searchingMembers = signal<boolean>(false);

  searchMembers() {
    this.searchingMembers.set(true);
    // TODO: Add focus to the search input field.
  }

  hideMembersSearch() {
    this.searchingMembers.set(false);
  }

  async loadCommunity() {
    const entry = await this.data.get(this.selectedCommunity()!);
    this.community.set(entry);
  }
}
