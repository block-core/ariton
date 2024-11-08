import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly #OWNER_DIDS: string[] = ['did:dht:jtubj7jooigmx9y7dz13j9kxhoy3pyo6jzizh3irkmwity3saxko'];

  readonly #APPS: { [key: string]: string } = {
    registries: 'did:dht:jtubj7jooigmx9y7dz13j9kxhoy3pyo6jzizh3irkmwity3saxko',
    communities: 'did:dht:jtubj7jooigmx9y7dz13j9kxhoy3pyo6jzizh3irkmwity3saxko',
  };

  readonly #ADMIN_DIDS: string[] = [
    'did:dht:jtubj7jooigmx9y7dz13j9kxhoy3pyo6jzizh3irkmwity3saxko',
    'did:dht:wfcf3guhgb183rbfx5r4a5u3kh9tgjnmdp75xdphyj6wbaxxym7o',
  ];

  constructor() {}

  public getAdminDids(): string[] {
    return [...this.#ADMIN_DIDS];
  }

  public isAdmin(did: string): boolean {
    return this.#ADMIN_DIDS.includes(did);
  }

  public getIdentifierForApp(app: string) {
    return this.#APPS[app];
  }

  public getOwnerDids(): string[] {
    return [...this.#OWNER_DIDS];
  }

  public isOwner(did: string): boolean {
    return this.#OWNER_DIDS.includes(did);
  }
}
