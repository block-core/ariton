import { Component, effect, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Record } from '@web5/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-data-view',
    standalone: true,
    imports: [RouterLink, CommonModule, MatTabsModule, MatIconModule, MatButtonModule, MatListModule],
    templateUrl: './data-view.component.html',
    styleUrl: './data-view.component.scss',
})
export class DataViewComponent {
    record = signal<any>(null);

    records = signal<Record[]>([]);

    recordId: string = '';

    constructor(
        private identityService: IdentityService,
        private route: ActivatedRoute,
    ) {
        effect(() => {
            console.log('WEB5 INITIALIZED!!! ', this.identityService.initialized());
            this.openRecord(this.recordId);
        });

        this.route.params.subscribe((params) => {
            const id = params['id'];
            this.recordId = id;
            this.openRecord(id);
        });
    }

    async openRecord(id: string) {
        if (!id) {
            return;
        }

        if (!this.identityService.initialized()) {
            return;
        }

        const { record } = await this.identityService.web5.dwn.records.read({
            message: {
                filter: {
                    recordId: id,
                },
            },
        });

        this.record.set(record);

        console.log(record);

        console.log(record.dataFormat);

        if (record.dataFormat === 'application/json') {
            var jsonData = await record.data.json();
            console.log(jsonData);
            this.recordData.set(JSON.stringify(jsonData, null, 2));
        } else if (record.dataFormat === 'text/plain') {
            var recordText = await record.data.text();
            console.log(recordText);
            this.recordData.set(recordText);
        }
    }

    recordData = signal<string>('');

    async load() {
        // Filterable Record Properties
        // recipient, protocol, protocolPath, contextId, schema, recordId, parentId, dataFormat, dateCreated
        // SORTING: createdAscending, createdDescending, publshedAscending, publishedDescending

        const { protocols } = await this.identityService.web5.dwn.protocols.query({
            message: {
                filter: {
                    protocol: 'https://music.org/protocol',
                },
            },
        });

        console.log(protocols);

        var { records } = await this.identityService.web5.dwn.records.query({
            message: {
                filter: {
                    dataFormat: 'application/json',
                },
            },
        });

        console.log('All records:');
        console.log(records);

        if (records) {
            this.records.set(records);
        }

        var { records } = await this.identityService.web5.dwn.records.query({
            from: this.identityService.did,
            message: {
                filter: {
                    schema: 'https://schema.org/Playlist',
                    dataFormat: 'application/json',
                },
            },
        });

        console.log(records);

        const response = await this.identityService.web5.dwn.records.query({
            message: {
                filter: {
                    parentId: 'bafyreianzpmhbgcgam5mys722vnsiuwn7y4ek6kjeyjptttquasw4hge2m',
                },
            },
        });

        console.log(response.records);

        var { records } = await this.identityService.web5.dwn.records.query({
            message: {
                filter: {
                    protocol: 'https://playlist.org/protocol',
                    protocolPath: 'playlist/video',
                },
            },
        });

        console.log(records);
    }

    async createRecord(publish: boolean) {
        // Create a JSON record
        var { record } = await this.identityService.web5.dwn.records.create({
            data: {
                content: 'Hello Web5',
                description: 'Keep Building!',
                tags: ['web5', 'ariton', 'did'],
            },
            message: {
                dataFormat: 'application/json',
                published: publish,
            },
        });

        console.log(record);

        var { record } = await this.identityService.web5.dwn.records.create({
            data: 'this record will be written to the local DWN',
            message: {
                dataFormat: 'text/plain',
            },
        });

        console.log(record);
    }

    async updateRecord() {
        // Create a new version of the record based on the original record
        /*  const { record: newVersionRecord } = await this.identityService.web5.dwn.records.createFrom({
                 record: this.record,
                 data: 'I am a new version of the original record!',
                 message: {
                 dataFormat: 'text/plain',
                 published: true,
                 },
             }); */
    }
}
