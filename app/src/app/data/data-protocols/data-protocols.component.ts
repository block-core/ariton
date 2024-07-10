import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { IdentityService } from '../../identity.service';
import { protocolDefinition as profile } from '../../../protocols/profile';
import { protocolDefinition as social } from '../../../protocols/social';
import { protocolDefinition as anyoneCollaborate } from '../../../protocols/anyone-collaborate';
import { protocolDefinition as chat } from '../../../protocols/chat';
import { protocolDefinition as freeForAll } from '../../../protocols/free-for-all';
import { protocolDefinition as minimal } from '../../../protocols/minimal';
import { protocolDefinition as message } from '../../../protocols/message';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-data-protocols',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatListModule, CommonModule, MatButtonModule, MatExpansionModule, MatIconModule],
    templateUrl: './data-protocols.component.html',
    styleUrl: './data-protocols.component.scss',
})
export class DataProtocolsComponent {
    accordion = viewChild.required(MatAccordion);

    identityService = inject(IdentityService);

    protocols = signal<any[]>([]);

    constructor() {
        effect(() => {
            if (this.identityService.initialized()) {
                this.load();
            }
        });
    }

    async ngOnInit() {}

    async load() {
        const { protocols } = await this.identityService.web5.dwn.protocols.query({
            message: {},
        });

        console.log(protocols);
        this.protocols.set(protocols);
    }

    getFormattedTypes(types: any): string {
        let formattedTypes = '';
        for (const typeName in types) {
            if (types.hasOwnProperty(typeName)) {
                formattedTypes += `<div class="type">
                            <strong>${typeName}</strong>`;
                if (types[typeName].schema) {
                    formattedTypes += `<div>Schema: <a href="${types[typeName].schema}">${types[typeName].schema}</a></div>`;
                }
                if (types[typeName].dataFormats) {
                    formattedTypes += `<div>Data Formats: ${types[typeName].dataFormats.join(', ')}</div>`;
                }
                formattedTypes += `</div>`;
            }
        }

        return formattedTypes;
    }

    getFormattedStructure(structure: any): string {
        let formattedStructure = '';

        const formatActions = (actions: any[]) => {
            return actions
                .map((action) => {
                    return `<div class="action">
                        <strong>Can:</strong> ${action.can.join(', ')}<br>
                        <strong>Who:</strong> ${action.who}<br>
                        ${action.of ? `<strong>Of:</strong> ${action.of}<br>` : ''}
                    </div>`;
                })
                .join('');
        };

        const formatStructure = (structure: any, indent: number = 0) => {
            let formatted = '';
            for (const key in structure) {
                if (structure.hasOwnProperty(key)) {
                    formatted += `<div class="structure" style="margin-left: ${indent * 20}px;">
                                <strong>${key}</strong>`;
                    if (key === '$actions') {
                        formatted += formatActions(structure[key]);
                    } else {
                        formatted += formatStructure(structure[key], indent + 1);
                    }
                    formatted += `</div>`;
                }
            }
            return formatted;
        };

        formattedStructure = formatStructure(structure);
        return formattedStructure;
    }

    async installProfileProtocol() {
        const { protocol, status } = await this.identityService.web5.dwn.protocols.configure({
            message: {
                definition: profile,
            },
        });

        console.log('Install status:', status);
        console.log('Protocol:', protocol);

        //sends protocol to remote DWNs immediately (vs waiting for sync)
        // await protocol.send(myDid);
    }

    async installSocialProtocol() {
        const { protocol, status } = await this.identityService.web5.dwn.protocols.configure({
            message: {
                definition: social,
            },
        });

        console.log('Install status:', status);
        console.log('Protocol:', protocol);

        //sends protocol to remote DWNs immediately (vs waiting for sync)
        // await protocol.send(myDid);
    }

    async installProtocols() {
        const protocols = [profile, social, anyoneCollaborate, chat, freeForAll, minimal, message];

        for (const definition of protocols) {
            const { protocol, status } = await this.identityService.web5.dwn.protocols.configure({
                message: {
                    definition: definition,
                },
            });

            console.log('Install status:', status);
            console.log('Protocol:', protocol);
        }

        await this.load();

        //sends protocol to remote DWNs immediately (vs waiting for sync)
        // await protocol.send(myDid);
    }
}
