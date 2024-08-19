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

  chat = signal<any>(null);

  chats = signal<MessageEntry[]>([]);

  threads = signal<Thread[]>([]);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      console.log('ROUTING!!!', params.get('id'));
      this.selectedChat.set(params.get('id'));
      this.layout.disableScrolling();
      // this.breadcrumb.parentId = params.get('id');
      // this.id.set(params.get('id')!);
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

          if (this.selectedChat() === ':id') {
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

    // Observe the custom breakpoint
    this.breakpointObserver.observe([customBreakpoint]).subscribe((result) => {
      console.log('MATCHES:', result.matches);
      if (result.matches) {
        // Code to execute when the viewport is 959.98px or less
        this.details.set(false);
        this.detailsBig.set(true);
      } else {
        // Code to execute when the viewport is greater than 959.98px
        //  this.small.set(false);
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

  async loadMessages(did: string) {
    // this.loadNotes({ labels: tagsString });

    // var { records: messages } = await this.identity.web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       protocol: chatDefinition.protocol,
    //       schema: chatDefinition.types.message.schema,
    //       dataFormat: chatDefinition.types.message.dataFormats[0],
    //     },
    //     dateSort: DwnDateSort.CreatedAscending,
    //   },
    // });

    // console.log('All messages', messages);

    // const senderStored = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';
    // const receiverStored = 'did:dht:1ko4cqh7c7i9z56r7qwucgpbra934rngc5eyffg1km5k6rc5991o';

    // var { records: messages2 } = await this.identity.web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       tags: {
    //         recipient: senderStored,
    //         sender: senderStored,
    //       },
    //       protocol: chatDefinition.protocol,
    //       schema: chatDefinition.types.message.schema,
    //       dataFormat: chatDefinition.types.message.dataFormats[0],
    //     },
    //     dateSort: DwnDateSort.CreatedAscending,
    //   },
    // });

    // console.log('messages2', messages2);

    // var { records: messages3 } = await this.identity.web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       tags: {
    //         recipients: senderStored,
    //       },
    //       protocol: chatDefinition.protocol,
    //       schema: chatDefinition.types.message.schema,
    //       dataFormat: chatDefinition.types.message.dataFormats[0],
    //     },
    //     dateSort: DwnDateSort.CreatedAscending,
    //   },
    // });

    // console.log('messages3', messages3);

    // var { records: messages4 } = await this.identity.web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       tags: {
    //         recipients: receiverStored,
    //       },
    //       protocol: chatDefinition.protocol,
    //       schema: chatDefinition.types.message.schema,
    //       dataFormat: chatDefinition.types.message.dataFormats[0],
    //     },
    //     dateSort: DwnDateSort.CreatedAscending,
    //   },
    // });

    // console.log('messages4', messages4);

    this.messages.set([]);

    const tags = {
      // recipient: did,
      // sender: did,
      recipients: did,
    };

    var { records } = await this.identity.web5.dwn.records.query({
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

    console.log('RECORDS!!!!!', records);

    let json = {};
    let recordEntry = null;

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records!) {
        let data = await record.data.json();
        // let vc = VerifiableCredential.parseJwt({ vcJwt: data });

        // let did = vc.issuer;

        // // If the outher issuer is us, get the inner one.
        // if (vc.issuer == this.identity.did) {
        //   const subject = vc.vcDataModel.credentialSubject as any;
        //   let vcInner = VerifiableCredential.parseJwt({ vcJwt: subject.vc });
        //   did = vcInner.issuer;
        // }

        let json: any = { record: record, data: data };

        console.log('AUTHOR:', record.author);
        console.log('this.identity.did:', this.identity.did);

        if (record.author == this.identity.did) {
          json.direction = 'out';
          console.log('DIRECTION IS OUT!!!');
          console.log('JSON:', json);
        }

        this.messages.update((requests) => [...requests, json]);

        // console.log('All friends:', this.friends());

        // recordEntry = record;
        // let recordJson = await record.data.json();
        // json = { ...recordJson, id: record.dataCid, did: record.author, created: record.dateCreated };
      }
    }

    // console.log(this.chats());
    // const recipients = this.chats().map((chat) => chat.data.recipient); // Adjust the path to the user identifier as needed
    // const senders = this.chats().map((chat) => chat.data.sender); // Adjust the path to the user identifier as needed
    // const distinctUsers = Array.from(new Set([...recipients, ...senders]));

    // // console.log(recipients);
    // // console.log(senders);
    // // console.log('Distinct users:', distinctUsers);

    // const sortedChats = this.chats().sort((a, b) => {
    //   return a.data.timestamp > b.data.timestamp ? -1 : 1;
    // });

    // distinctUsers.map(async (did) => {
    //   const latestMessage = sortedChats.find((chat) => chat.data.recipient == did || chat.data.sender == did);

    //   this.threads.update((requests) => [
    //     ...requests,
    //     { did: did, text: latestMessage?.data.text, timestamp: latestMessage?.data.timestamp },
    //   ]);
    // });

    // console.log('Threads:', this.threads());
  }

  async load() {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: chatDefinition.protocol,
          schema: chatDefinition.types.message.schema,
          dataFormat: chatDefinition.types.message.dataFormats[0],
        },
      },
    });

    console.log('Friend VCs:');
    console.log(records);

    let json = {};
    let recordEntry = null;

    this.chats.set([]);
    this.threads.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records!) {
        let data = await record.data.json();
        // let vc = VerifiableCredential.parseJwt({ vcJwt: data });

        // let did = vc.issuer;

        // // If the outher issuer is us, get the inner one.
        // if (vc.issuer == this.identity.did) {
        //   const subject = vc.vcDataModel.credentialSubject as any;
        //   let vcInner = VerifiableCredential.parseJwt({ vcJwt: subject.vc });
        //   did = vcInner.issuer;
        // }

        let json: any = { record: record, data: data };

        if (record.author == this.identity.did) {
          json.direction = 'out';
        }

        this.chats.update((requests) => [...requests, json]);

        // console.log('All friends:', this.friends());

        // recordEntry = record;
        // let recordJson = await record.data.json();
        // json = { ...recordJson, id: record.dataCid, did: record.author, created: record.dateCreated };
      }
    }

    // console.log(this.chats());
    const recipients = this.chats().map((chat) => chat.data.recipient); // Adjust the path to the user identifier as needed
    const senders = this.chats().map((chat) => chat.data.sender); // Adjust the path to the user identifier as needed

    // TODO: This is a temporary solution where we get all DIDs from friends and list them in the chat.
    // In the future, there will be a "New Chat" button where user picks a friend (and potentially paste a DID).
    const friends = await this.loadFriends();

    const distinctUsers = Array.from(new Set([...recipients, ...senders, ...friends]));

    // console.log(recipients);
    // console.log(senders);
    // console.log('Distinct users:', distinctUsers);

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

    console.log('Threads:', this.threads());
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

    console.log('Friend VCs:');
    console.log(records);

    let json = {};
    let recordEntry = null;

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
        // let json: any = { record: record, data: { did } };
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

  open(id: string) {
    const chat = this.folders.find((f) => f.id === id);
    this.chat.set(chat);
  }

  message: string = '';

  async submitMessage() {
    console.log('SUBMIT MESSAGE', this.message);

    if (this.message.trim()) {
      console.log('Message submitted:', this.message);

      let recipientDid = this.selectedProfile().did;
      const currentDate = new Date();

      const data: Message = {
        text: this.message,
        sender: this.identity.did,
        recipient: recipientDid, // Do we need to replicate this value, it's in the record.
        timestamp: currentDate.toISOString(),
      };

      const tags = {
        // sender: this.identity.did,
        // recipient: recipientDid,
        // recipients: [recipientDid, this.identity.did],
        // sender: recipientDid,
        // recipient: this.identity.did,
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

      record?.send(recipientDid);

      console.log('Chat record:', record);

      let json: any = { record: record, data: data, direction: 'out' };

      console.log('CHat JSON:', json);

      this.messages.update((requests) => [...requests, json]);

      this.message = ''; // Clear the input field after submission
    }
  }

  async deleteChat() {
    for (let message of this.messages()) {
      await message.record.delete();
    }

    this.messages.set([]);
  }

  async newChat() {
    let recipientDid = this.identity.did;
    recipientDid = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    const currentDate = new Date();

    const data: Message = {
      text: 'Hello, how are you?',
      sender: this.identity.did,
      recipient: recipientDid, // Do we need to replicate this value, it's in the record.
      timestamp: currentDate.toISOString(),
    };

    const tags = {
      // sender: this.identity.did,
      // recipient: recipientDid,
      // recipients: [recipientDid, this.identity.did],

      // sender: recipientDid,
      // recipient: this.identity.did,
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

    console.log('Chat record:', record);

    let json: any = { record: record, data: data };

    console.log('CHat JSON:', json);

    this.messages.update((requests) => [...requests, json]);

    return record;
  }

  folders: Section[] = [
    {
      id: '1',
      name: 'Sondre',
      message: 'Hey, how are you?',
      updated: new Date('1/1/24'),
      avatar: 'https://ariton.app/assets/sondre.png',
    },
    {
      id: '2',
      name: 'Dan',
      message: 'Do you have the reports?',
      updated: new Date('1/17/16'),
      avatar: 'https://ariton.app/assets/dan.png',
    },
    {
      id: '3',
      name: 'Joe',
      message: 'I need help with the project',
      updated: new Date('1/28/16'),
      avatar: 'https://ariton.app/assets/sondre.png',
    },
  ];
  notes: Section[] = [
    {
      id: '4',
      name: 'Luba',
      message: 'I need to plan my vacation',
      updated: new Date('2/20/16'),
      avatar: 'https://ariton.app/assets/lu.jpg',
    },
    {
      id: '5',
      name: 'Jane',
      message: 'I need to remodel my kitchen',
      updated: new Date('1/18/16'),
      avatar: 'https://ariton.app/assets/sondre.png',
    },
  ];
}
