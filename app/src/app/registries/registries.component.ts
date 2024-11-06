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
import { Record } from '@web5/api';

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

  records = signal<{ record: Record; data: any; id: string }[]>([]);

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
    const query = {
      from: this.app.aritonDid,
      message: {
        filter: {
          protocol: registry.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    };

    console.log('QUERY:', query);

    //Query records with plain text data format
    const { records } = await this.identity.web5.dwn.records.query(query);

    console.log('FOUND REGISTRY RECORDS:', records);

    if (records) {
      const recordIds = records.map((record) => record.id);
      const existingRecordIds = this.records().map((entry) => entry.record.id);

      // Find records to remove (exists in current but not in new records)
      const recordsToRemove = existingRecordIds.filter((id) => !recordIds.includes(id));

      // Find new records to add (exists in new but not in current)
      const recordsToAdd = recordIds.filter((id) => !existingRecordIds.includes(id));

      // Remove old records
      this.records.update((records) => [...records.filter((entry) => !recordsToRemove.includes(entry.record.id))]);

      for (let record of records!) {
        if (recordsToAdd.includes(record.id)) {
          let data = await record.data.json();
          let json: any = { record: record, data: data };
          this.records.update((records) => [...records, json]);

          // Try to import if the record is not already imported. It will give conflict if already imported.
          const { status } = await record.import();
          console.log('IMPORT STATUS:', status);
        }
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
      this.loadRemote();
    } else {
      console.log('There are no records... load remotely');
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
