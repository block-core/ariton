import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly #ADMIN_DIDS: string[] = ['did:ion:test:example1', 'did:ion:test:example2', 'did:ion:test:example3'];

  constructor() {}

  public getAdminDids(): string[] {
    return [...this.#ADMIN_DIDS];
  }

  public isAdmin(did: string): boolean {
    return this.#ADMIN_DIDS.includes(did);
  }
}
