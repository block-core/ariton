import { Component, signal } from '@angular/core';
import { IdentityService } from '../identity.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss',
})
export class IdentityComponent {
  portableDid = signal<string>('');
  didDocument = signal<string>('');
  didSubject = signal<string>('');

  constructor(public identity: IdentityService) {}

  async createIdentity() {
    // var didBearer = await this.identity.create();
    // // DID and its associated data which can be exported and used in different contexts/apps
    // const portableDid = await didBearer.export();
    // const didDocument = didBearer.document;
    // this.didSubject.set(didBearer.uri);
    // this.didDocument.set(JSON.stringify(didDocument));
    // this.portableDid.set(JSON.stringify(portableDid));
  }
}
