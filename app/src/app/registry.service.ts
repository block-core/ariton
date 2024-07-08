import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RegistryService {
    constructor() {}

    bsn: {
        tokens: any[];
        sources: any[];
        accounts: any[];
    } = {
        tokens: [],
        sources: [],
        accounts: [],
    };
}
