import { inject, Injectable } from '@angular/core';
import { protocolDefinition as profile } from '../protocols/profile';
import { protocolDefinition as social } from '../protocols/social';
import { protocolDefinition as anyoneCollaborate } from '../protocols/anyone-collaborate';
import { protocolDefinition as chat } from '../protocols/chat';
import { protocolDefinition as freeForAll } from '../protocols/free-for-all';
import { protocolDefinition as minimal } from '../protocols/minimal';
import { protocolDefinition as message } from '../protocols/message';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  identityService = inject(IdentityService);

  constructor() {}

  async register() {
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
  }
}
