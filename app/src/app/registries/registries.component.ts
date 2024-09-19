import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './registries-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { IdentityService } from '../identity.service';
import { registry } from '../../protocols';
import { CommonModule } from '@angular/common';
import { DidPipe } from '../shared/pipes/did.pipe';
import { LayoutService } from '../layout.service';
import { AppService } from '../app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrl: './registries.component.scss',
  standalone: true,
  imports: [
    DidPipe,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    RouterModule,
  ],
})
export class RegistriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource = new TableDataSource();

  identity = inject(IdentityService);

  app = inject(AppService);

  records = signal<any[]>([]);

  layout = inject(LayoutService);

  loading = signal<boolean>(true);

  constructor(private router: Router) {
    this.layout.marginOn();

    this.layout.resetActions();

    effect(async () => {
      if (this.identity.initialized()) {
        await this.load();
      }
    });
  }

  async loadRemote() {
    //Query records with plain text data format
    const { records } = await this.identity.web5.dwn.records.query({
      from: this.app.aritonDid,
      message: {
        filter: {
          protocol: registry.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    // Reset local records
    this.records.set([]);

    if (records) {
      for (let record of records!) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        this.records.update((records) => [...records, json]);

        // Import the record locally for caching.
        // TODO: Add TTL to these records so they can be refreshed.
        // const { status } = await record.import();

        // Try to import if the record is not already imported. It will give conflict if already imported.
        const { status } = await record.import();
      }
    }

    this.loading.set(false);
  }

  async load() {
    //Query records with plain text data format
    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: registry.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    this.records.set([]);

    // If there are records, then we stop loading and display local cached (imported) records.
    if (records && records.length > 0) {
      for (let record of records!) {
        let data = await record.data.json();
        let json: any = { record: record, data: data, id: record.id };
        this.records.update((records) => [...records, json]);
      }

      this.loading.set(false);

      // Load remote records in the background.
      await this.loadRemote();
    } else {
      await this.loadRemote();
      this.loading.set(false);
    }
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  openRegistry(registry: string) {
    this.router.navigate(['registry', registry]);
  }
}
