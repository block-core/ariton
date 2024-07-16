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

  constructor(private router: Router) {
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

        let json = { record: record, data: data };

        this.records.update((records) => [...records, json]);
      });
    }

    // if (record) {
    //   //send record to recipient's DWN
    //   const { status } = await record.send(recipient);
    //   console.log('Record sent:', status, record);

    //   // Show a toast notification
    //   this.snackBar.open('Record sent successfully!', 'Close', {
    //     duration: 3000, // Duration in milliseconds
    //   });
    // }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openRegistry(registry: string) {
    this.router.navigate(['registries', registry]);
  }
}
