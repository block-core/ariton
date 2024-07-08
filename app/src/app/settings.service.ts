import { Injectable } from '@angular/core';
import { SignalsSimpleStoreService } from './signals.service';

export interface SettingsState {
    language: string;
    debug: boolean;
    servers: string[];
}

@Injectable()
export class SettingsStateService extends SignalsSimpleStoreService<SettingsState> {
    constructor() {
        super();
    }
}
