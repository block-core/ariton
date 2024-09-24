import { inject, Injectable } from '@angular/core';
import { protocolDefinition as profile } from '../protocols/profile';
import { protocolDefinition as community } from '../protocols/community';
import { protocolDefinition as social } from '../protocols/social';
import { protocolDefinition as anyoneCollaborate } from '../protocols/anyone-collaborate';
import { protocolDefinition as chat } from '../protocols/chat';
import { protocolDefinition as freeForAll } from '../protocols/free-for-all';
import { protocolDefinition as minimal } from '../protocols/minimal';
import { protocolDefinition as message } from '../protocols/message';
import { protocolDefinition as registry } from '../protocols/registry';
import { protocolDefinition as note } from '../protocols/note';
import { protocolDefinition as file } from '../protocols/file';
import { protocolDefinition as text } from '../protocols/text';
import { protocolDefinition as todo } from '../protocols/task';
import { protocolDefinition as connection } from '../protocols/connection';
import { protocolDefinition as notification } from '../protocols/notification';
import { protocolDefinition as post } from '../protocols/post';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  identityService = inject(IdentityService);

  constructor() {}

  async register() {
    const protocols = [
      note,
      profile,
      community,
      social,
      anyoneCollaborate,
      chat,
      freeForAll,
      minimal,
      message,
      registry,
      file,
      text,
      todo,
      connection,
      notification,
      post,
    ];

    for (const definition of protocols) {
      const { protocol, status } = await this.identityService.web5.dwn.protocols.configure({
        message: {
          definition: definition,
        },
      });

      console.log('Install status:', status);
      console.log('Protocol:', protocol);

      // Make sure we send the protocol to our public DWNs. If this is not done, then friend requests, etc.
      // for very new accouts won't work.
      protocol?.send(this.identityService.did);
    }
  }
}
