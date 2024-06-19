import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Record } from '@web5/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-data-management',
    standalone: true,
    imports: [RouterLink, CommonModule, MatTabsModule, MatIconModule, MatButtonModule, MatListModule],
    templateUrl: './data-management.component.html',
    styleUrl: './data-management.component.scss'
})
export class DataManagementComponent {

    record = signal<any>(null);

    records = signal<Record[]>([]);

    constructor(private identityService: IdentityService) { }

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
                protocolPath: 'playlist/video'
              },
            },
          });

          console.log(records);

    }

    async createRecord(publish: boolean) {
        // Create a JSON record
        var { record } = await this.identityService.web5.dwn.records.create({
            data: {
                content: "Hello Web5",
                description: "Keep Building!",
                tags: ["web5", "ariton", "did"]
            },
            message: {
                dataFormat: 'application/json',
                published: publish
            }
        });

        console.log(record);

        var { record } = await this.identityService.web5.dwn.records.create({
            data: "this record will be written to the local DWN",
            message: {
                dataFormat: 'text/plain'
            }
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
