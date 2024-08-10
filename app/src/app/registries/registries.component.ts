import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './registries-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { IdentityService } from '../identity.service';
import { registry } from '../../protocols';
import { CommonModule } from '@angular/common';
import { DidPipe } from '../shared/pipes/did.pipe';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrl: './registries.component.scss',
  standalone: true,
  imports: [DidPipe, CommonModule, MatButtonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class RegistriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource = new TableDataSource();

  identity = inject(IdentityService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  records = signal<any[]>([]);

  layout = inject(LayoutService);

  constructor(private router: Router) {
    this.layout.resetActions();

    effect(async () => {
      if (this.identity.initialized()) {
        await this.load();
      }
    });
  }

  async deleteData() {
    for (const record of this.records()) {
      // Delete all records with the specified protocol and protocol path
      await this.identity.web5.dwn.records.delete({
        message: {
          recordId: record.record.id,
        },
      });
    }

    this.records.set([]);

    // await this.load();
  }

  async createData() {
    // During development, we will populate the registry protocol with local dummy data. In the future,
    // data will be retrieved from one or multiple official registries (DWNs).
    const { status, record } = await this.identity.web5.dwn.records.create({
      data: {
        name: 'Blockchain Social Network (BSN)',
        description: 'Stellar blockchain data registry',
        url: 'https://ariton.app',
        icon: 'https://ariton.app/assets/ariton-favicon.png',
        owner: this.identity.did,
      },
      message: {
        protocol: registry.uri,
        protocolPath: 'profile',
        dataFormat: 'application/json',
        tags: {
          module: 'registries',
        },
      },
    });

    await this.identity.web5.dwn.records.create({
      data: {
        name: 'Liberstad CC',
        description: 'Crypto Company Registry',
        url: 'https://www.liberstad.cc',
        icon: 'https://www.liberstad.cc/liberstad-square-512x512.png',
        owner: this.identity.did,
      },
      message: {
        protocol: registry.uri,
        protocolPath: 'profile',
        dataFormat: 'application/json',
        tags: {
          module: 'registries',
        },
      },
    });

    await this.identity.web5.dwn.records.create({
      data: {
        name: 'Terra Registry',
        description: 'Registry of free territories',
        url: '',
        icon: 'data:image/png;base64,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',
        owner: this.identity.did,
      },
      message: {
        protocol: registry.uri,
        protocolPath: 'profile',
        dataFormat: 'application/json',
        tags: {
          module: 'registries',
        },
      },
    });

    await this.identity.web5.dwn.records.create({
      data: {
        name: 'Free Citadels',
        description: 'Explore the organisations that plan and build freedom communities. ',
        url: 'https://freecitadels.com/',
        icon: 'https://unicorn-cdn.b-cdn.net/7a9da0d8-981c-484c-9640-1c65fbd0616b/free-citadels-logo.png?width=70&height=70',
        owner: this.identity.did,
      },
      message: {
        protocol: registry.uri,
        protocolPath: 'profile',
        dataFormat: 'application/json',
        tags: {
          module: 'registries',
        },
      },
    });

    await this.load();
  }

  async load() {
    //Query records with plain text data format
    const response = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: registry.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    this.records.set([]);

    if (response.records) {
      // Loop through returned records and print text from each
      response.records.forEach(async (record) => {
        let data = await record.data.json();
        //   json = { ...json, id: record.dataCid, author: record.author, created: record.dateCreated };
        let json: any = { record: record, data: data };

        // console.log(record.author);
        // console.log(this.identity.did);

        // if (record.author == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.records.update((records) => [...records, json]);
      });
    }
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  openRegistry(registry: string) {
    this.router.navigate(['registries', registry]);
  }
}
