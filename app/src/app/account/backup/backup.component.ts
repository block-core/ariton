import { Component, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IdentityService } from '../../identity.service';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-backup',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule, RouterModule],
    templateUrl: './backup.component.html',
    styleUrl: './backup.component.scss',
})
export class BackupComponent {
    recoveryPhrase = '';

    reveal = signal<boolean>(false);

    constructor(
        private router: Router,
        public identityService: IdentityService,
        public appService: AppService,
    ) {}

    async backupToFile() {
        const portableDid = await this.identityService.activeAgent().vault.backup();
        const data = portableDid.data; // Assuming portableDid is the string you want to save
        await this.saveFile(data);
    }

    async copyRecoveryPhrase(): Promise<void> {
        try {
            await navigator.clipboard.writeText(this.appService.account().recoveryPhrase);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    confirmBackup() {
        this.appService.state().backupConfirmed = true;
        this.appService.saveState();

        this.router.navigate(['/introduction']);
    }

    async saveFile(data: string) {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'ariton-account-backup.txt'; // Suggest a filename for the download
        document.body.appendChild(a); // Append the anchor to the body to make it clickable
        a.click(); // Programmatically click the anchor to trigger the download

        window.URL.revokeObjectURL(url); // Clean up by revoking the Blob URL
        a.remove(); // Remove the anchor from the document
    }

    async backupToProtectedFile() {
        const portableDid = await this.identityService.activeAgent().agentDid.export();
        console.log(portableDid);
        const data = JSON.stringify(portableDid); // Assuming portableDid is the string you want to save
        await this.saveFile(data);
    }

    async revealRecoveryPhrase() {
        this.reveal.set(!this.reveal());
    }
}
