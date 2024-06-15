import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistryService } from '../../registry.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatIconModule,
    DatePipe,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class RegistryComponent implements AfterViewInit {
  tokens: any[] = [];

  sources: any[] = [];

  accounts: any[] = [];

  updated: any;

  constructor(
    private router: Router,
    private registryService: RegistryService
  ) {}

  ngAfterViewInit(): void {}

  shorten(str: string) {
    return str.substring(0, 5) + '...' + str.substring(str.length - 5);
  }

  async ngOnInit() {
    var request = await fetch('https://bsn.mtla.me/json');

    if (request.ok) {
      var data = await request.json();

      this.updated = data.createDate;

      this.tokens = data.knownTokens.map(
        (token: { split: (arg0: string) => [any, any] }) => {
          const [name, id] = token.split('-');
          return { id, name, short: this.shorten(id) };
        }
      );

      this.sources = data.usedSources.map(
        (token: { split: (arg0: string) => [any, any] }) => {
          const [name, id] = token.split('-');
          return { id, name, short: this.shorten(id) };
        }
      );

      this.accounts = Object.entries(data.accounts).map(
        ([id, accountData]: [string, any]) => {
          return {
            id,
            short: this.shorten(id),
            balances: accountData.balances,
            profile: accountData.profile,
            tags: accountData.tags
              ? Object.entries(accountData.tags).map(
                  ([tag, value]: [string, any]) => {
                    return { id: tag, value };
                  }
                )
              : [],
          };
        }
      );

      this.registryService.bsn.tokens = this.tokens;
      this.registryService.bsn.sources = this.sources;
      this.registryService.bsn.accounts = this.accounts;

      console.log(this.registryService.bsn);
    }
  }
}
