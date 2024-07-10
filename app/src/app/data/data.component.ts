import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DataManagementComponent } from './data-management/data-management.component';
import { DataProtocolsComponent } from './data-protocols/data-protocols.component';
import { DataLiveComponent } from './data-live/data-live.component';

@Component({
    selector: 'app-data',
    standalone: true,
    imports: [MatTabsModule, MatIconModule, DataManagementComponent, DataProtocolsComponent, DataLiveComponent],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss',
})
export class DataComponent {}
