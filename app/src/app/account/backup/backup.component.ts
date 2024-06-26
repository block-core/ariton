import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IdentityService } from '../../identity.service';
import { Web5IdentityAgent } from '@web5/identity-agent';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.scss'
})
export class BackupComponent {

  constructor(private identityService: IdentityService) { }

  async backupToFile() {
    const portableDid = await this.identityService.activeAgent().vault.backup();
    const data = portableDid.data; // Assuming portableDid is the string you want to save
    await this.saveFile(data);
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

  async backupToProtectedFile () {
    const portableDid = await this.identityService.activeAgent().agentDid.export();
    console.log(portableDid);
    const data = JSON.stringify(portableDid); // Assuming portableDid is the string you want to save
    await this.saveFile(data);
  }
}
