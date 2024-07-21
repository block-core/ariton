import { effect, inject, Injectable, signal } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  appService = inject(AppService);

  loaded = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.appService.initialized()) {
        this.load();
      }
    });
  }

  updated: any;

  //   tokens: any[] = [];

  //   sources: any[] = [];

  //   accounts: any[] = [];

  bsn: {
    tokens: any[];
    sources: any[];
    accounts: any[];
    tags: any[];
    accounts_filtered: any[];
  } = {
    tokens: [],
    sources: [],
    accounts: [],
    tags: [],
    accounts_filtered: [],
  };

  shorten(str: string) {
    return str.substring(0, 5) + '...' + str.substring(str.length - 5);
  }

  filter(tags: string[]) {
    if (!tags || tags.length == 0) {
      this.bsn.accounts_filtered = this.bsn.accounts;
    } else {
      this.bsn.accounts_filtered = this.bsn.accounts.filter((account) => account.tags.some((tag: any) => tags.includes(tag.id)));
    }
  }

  async load() {
    var request = await fetch('https://bsn.mtla.me/json');

    if (request.ok) {
      var data = await request.json();

      this.updated = data.createDate;

      let tokens = data.knownTokens.map((token: { split: (arg0: string) => [any, any] }) => {
        const [name, id] = token.split('-');
        return { id, name, short: this.shorten(id) };
      });

      let sources = data.usedSources.map((token: { split: (arg0: string) => [any, any] }) => {
        const [name, id] = token.split('-');
        return { id, name, short: this.shorten(id) };
      });

      let accounts = Object.entries(data.accounts).map(([id, accountData]: [string, any]) => {
        return {
          id,
          short: this.shorten(id),
          balances: accountData.balances,
          profile: accountData.profile,
          tags: accountData.tags
            ? Object.entries(accountData.tags).map(([tag, value]: [string, any]) => {
                return { id: tag, value };
              })
            : [],
        };
      });

      this.bsn.tokens = tokens;
      this.bsn.sources = sources;
      this.bsn.accounts = accounts;

      // Collect all unique tags from accounts
      const uniqueTags = new Set<string>();
      accounts.forEach((account) => {
        account.tags.forEach((tag) => {
          uniqueTags.add(tag.id);
        });
      });
      this.bsn.tags = Array.from(uniqueTags).sort();

      // By default add all to be rendered in the filtered array.
      this.bsn.accounts_filtered = this.bsn.accounts;

      this.loaded.set(true);
    }
  }
}
