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
import { AppService } from '../app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    this.layout.resetActions();

    effect(async () => {
      if (this.identity.initialized()) {
        await this.load();
      }
    });
  }

  async load() {
    //Query records with plain text data format
    const response = await this.identity.web5.dwn.records.query({
      from: this.app.aritonDid,
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
      response.records.forEach(async (record) => {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        this.records.update((records) => [...records, json]);
      });
    }

    this.loading.set(false);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  openRegistry(registry: string) {
    this.router.navigate(['registries', registry]);
  }
}
