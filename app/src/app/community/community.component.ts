import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AgoPipe } from '../shared/pipes/ago.pipe';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { SizePipe } from '../shared/pipes/size.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {
  images = ['nature', 'sky', 'grass', 'mountains', 'rivers', 'glacier', 'forest', 'streams', 'rain', 'clouds'];

  photos = signal<any[]>([]);

  ngOnInit() {
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
}
