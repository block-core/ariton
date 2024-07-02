import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { StorageService } from '../storage.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {
  appService = inject(AppService);

  private storage = inject(StorageService);

  reset = computed(() => (this.appService.account().passwordHash));

  async wipe() {
    // Clear all data from localStorage
    this.storage.clear();

    console.log('Local storage data has been wiped!');
    
    // Clear all data from IndexedDb
    await indexedDB.deleteDatabase('level-js-DATA/AGENT');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DID_RESOLVERCACHE');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_DATASTORE');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_EVENTLOG');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_MESSAGEINDEX');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_MESSAGESTORE');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/VAULT_STORE');

    console.log('Data has been wiped!');

    window.location.reload();
  }
}
