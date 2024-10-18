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
import { protocolDefinition as data } from '../protocols/data';
import { IdentityService } from './identity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web5 } from '@web5/api';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  identityService = inject(IdentityService);

  snackBar = inject(MatSnackBar);

  constructor() {}

  async register(web5: Web5) {
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
      data,
    ];

    for (const definition of protocols) {
      const { protocol, status } = await web5.dwn.protocols.configure({
        message: {
          definition: definition,
        },
      });

      if (status.code !== 202) {
        console.error('Failed to install protocol:', status, protocol);

        this.snackBar.open(
          `Failed to install protocol. Code: ${status.code}, Protocol: ${definition.protocol}`,
          'Close',
          {
            duration: 1000,
          },
        );
      }

      // Make sure we send the protocol to our public DWNs. If this is not done, then friend requests, etc.
      // for very new accouts won't work.
      const result = await protocol?.send(this.identityService.did);
      console.log('Protocol send status: ', result?.status);
    }

    console.log('Protocols installed.');
  }
}
