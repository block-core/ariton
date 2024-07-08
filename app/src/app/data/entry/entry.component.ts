import { Component } from '@angular/core';
import { RegistryService } from '../../registry.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-data-entry',
    standalone: true,
    imports: [JsonPipe, CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.scss',
})
export class DataEntryComponent {
    entry: any;

    constructor(
        private registryService: RegistryService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe((params) => {
            const source = params['source'];
            const id = params['id'];

            this.entry = this.registryService.bsn.accounts.find((account) => {
                return account.id === id;
            });

            console.log(this.entry);
        });
    }
}
