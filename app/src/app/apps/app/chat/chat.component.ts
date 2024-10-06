import { Component, effect, inject, Input, model, Output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutService } from '../../../layout.service';
import { OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { AgoPipe } from '../../../shared/pipes/ago.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EventEmitter } from 'stream';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IdentityService } from '../../../identity.service';
import { AppService } from '../../../app.service';
import { protocolDefinition as chatDefinition } from '../../../../protocols/chat';
import { Record } from '@web5/api';
import { ProfileImageDirective } from '../../../shared/directives/profile-image.directive';
import { ProfileNameDirective } from '../../../shared/directives/profile-name.directive';
import { ProfileService } from '../../../profile.service';
import { DwnDateSort } from '@web5/agent';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { credential } from '../../../../protocols';
import { VerifiableCredential } from '@web5/credentials';

export interface Section {
  id: string;
  name: string;
  updated: Date;
  message: string;
  avatar: string;
}

export interface Message {
  text: string;
  sender: string;
  recipient: string;
  timestamp: string;
}

export interface Thread {
  did: string;
  text?: string;
  timestamp?: string;
}

export interface MessageEntry {
  record: Record;
  data: Message;
  direction?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatTooltipModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    DatePipe,
    AgoPipe,
    MatButtonToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ProfileImageDirective,
    ProfileNameDirective,
    MatProgressSpinnerModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnDestroy {
  viewStyle = model<string>('card');

  layout = inject(LayoutService);

  details = signal<boolean>(true);

  detailsBig = signal<boolean>(false);

  identity = inject(IdentityService);

  app = inject(AppService);

  private breakpointObserver = inject(BreakpointObserver);

  @Input() fullsize: boolean = false;

  route = inject(ActivatedRoute);

  profile = inject(ProfileService);

  selectedChat = signal<string | null>(null);

  selectedProfile = signal<any>(null);

  loading = signal<boolean>(false);

  messages = signal<MessageEntry[]>([]);

  message: string = '';

  // chat = signal<any>(null);

  /** Used on initial load to get all chat messages and render the threads list */
  chats = signal<MessageEntry[]>([]);

  threads = signal<Thread[]>([]);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.layout.disableScrolling();
      this.selectedChat.set(params.get('id'));
    });

    effect(async () => {
      if (this.app.initialized()) {
        await this.load();
      }
    });

    effect(
      async () => {
        if (this.selectedChat() && this.app.initialized()) {
          this.selectedProfile.set(null);
          this.messages.set([]);

          if (this.selectedChat() === ':id' || this.selectedChat() === 'home') {
            return;
          }

          this.loading.set(true);

          const profile = await this.profile.loadProfile(this.selectedChat()!);
          this.selectedProfile.set(profile);
          await this.loadMessages(this.selectedChat()!);

          this.loading.set(false);
        }
      },
      { allowSignalWrites: true },
    );

    const customBreakpoint = '(max-width: 1024px)';

    this.breakpointObserver.observe([customBreakpoint]).subscribe((result) => {
      if (result.matches) {
        this.details.set(false);
        this.detailsBig.set(true);
      } else {
        this.detailsBig.set(false);
      }
    });
  }

  async ngOnInit() {
    this.layout.disableScrolling();
    this.layout.resetActions();
    this.layout.marginOff();
  }

  ngOnDestroy() {
    this.layout.enableScrolling();
  }

  async reloadMessages() {
    await this.loadMessages(this.selectedChat()!);
  }

  async loadMessages(did: string) {
    this.messages.set([]);

    const tags = {
      recipients: did,
    };

    var { records } = await this.identity.web5.dwn.records.query({
      from: this.identity.did,
      message: {
        filter: {
          tags: tags,
          protocol: chatDefinition.protocol,
          schema: chatDefinition.types.message.schema,
          dataFormat: chatDefinition.types.message.dataFormats[0],
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records!) {
        let data = await record.data.json();

        let json: any = { record: record, data: data };

        if (record.creator == this.identity.did) {
          json.direction = 'out';
        }

        this.messages.update((requests) => [...requests, json]);
      }
    }
  }

  async load() {
    var { records } = await this.identity.web5.dwn.records.query({
      from: this.identity.did,
      message: {
        filter: {
          protocol: chatDefinition.protocol,
          schema: chatDefinition.types.message.schema,
          dataFormat: chatDefinition.types.message.dataFormats[0],
        },
      },
    });

    this.chats.set([]);
    this.threads.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records!) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        if (record.creator == this.identity.did) {
          json.direction = 'out';
        }

        this.chats.update((requests) => [...requests, json]);
      }
    }

    // console.log(this.chats());
    const recipients = this.chats().map((chat) => chat.data.recipient); // Adjust the path to the user identifier as needed
    const senders = this.chats().map((chat) => chat.data.sender); // Adjust the path to the user identifier as needed

    // TODO: This is a temporary solution where we get all DIDs from friends and list them in the chat.
    // In the future, there will be a "New Chat" button where user picks a friend (and potentially paste a DID).
    const friends = await this.loadFriends();

    const distinctUsers = Array.from(new Set([...recipients, ...senders, ...friends]));

    const sortedChats = this.chats().sort((a, b) => {
      return a.data.timestamp > b.data.timestamp ? -1 : 1;
    });

    distinctUsers.map(async (did) => {
      const latestMessage = sortedChats.find((chat) => chat.data.recipient == did || chat.data.sender == did);

      // Don't list the current user as his own thread.
      if (did != this.identity.did) {
        this.threads.update((requests) => [
          ...requests,
          { did: did, text: latestMessage?.data.text, timestamp: latestMessage?.data.timestamp },
        ]);
      }
    });
  }

  async loadFriends() {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          schema: credential.friendship,
          dataFormat: credential.format,
        },
      },
    });

    let dids = [];

    if (records) {
      for (const record of records!) {
        let data = await record.data.text();
        let vc = VerifiableCredential.parseJwt({ vcJwt: data });

        let did = vc.issuer;

        // If the outher issuer is us, get the inner one.
        if (vc.issuer == this.identity.did) {
          const subject = vc.vcDataModel.credentialSubject as any;
          let vcInner = VerifiableCredential.parseJwt({ vcJwt: subject.vc });
          did = vcInner.issuer;
        }

        dids.push(did);
      }
    }

    return dids;
  }

  toggleDetails() {
    this.details.set(!this.details());
  }

  closeDetails() {
    this.details.set(false);
  }

  async submitMessage() {
    if (this.message.trim()) {
      let recipientDid = this.selectedProfile().did;
      const currentDate = new Date();

      const data: Message = {
        text: this.message,
        sender: this.identity.did,
        recipient: recipientDid, // Do we need to replicate this value, it's in the record.
        timestamp: currentDate.toISOString(),
      };

      const tags = {
        recipients: [this.identity.did, recipientDid],
      };

      const { record } = await this.identity.web5.dwn.records.write({
        data: data,
        message: {
          tags: tags,
          protocol: chatDefinition.protocol,
          protocolPath: 'message',
          schema: chatDefinition.types.message.schema,
          recipient: recipientDid,
        },
      });

      await record?.send(recipientDid);
      await record?.send();

      let json: any = { record: record, data: data, direction: 'out' };

      this.messages.update((requests) => [...requests, json]);
      this.message = '';
    }
  }

  async deleteChat() {
    for (let message of this.messages()) {
      await message.record.delete();
    }

    this.messages.set([]);
  }

  async newChat() {
    let recipientDid = this.selectedProfile().did;

    const currentDate = new Date();

    const data: Message = {
      text: 'Hello, how are you?',
      sender: this.identity.did,
      recipient: recipientDid, // Do we need to replicate this value, it's in the record.
      timestamp: currentDate.toISOString(),
    };

    const tags = {
      recipients: [this.identity.did, recipientDid],
    };

    const { record } = await this.identity.web5.dwn.records.write({
      data: data,
      message: {
        tags: tags,
        protocol: chatDefinition.protocol,
        protocolPath: 'message',
        schema: chatDefinition.types.message.schema,
        recipient: recipientDid,
      },
    });

    let json: any = { record: record, data: data };
    this.messages.update((requests) => [...requests, json]);

    return record;
  }
}
