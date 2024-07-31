import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { BearerDid } from '@web5/dids';
import { DwnApi } from '@web5/api';
import { PlatformAgentTestHarness } from '@web5/agent';
import { Web5UserAgent } from '@web5/user-agent';
import { profile } from '.';

describe('ProfileProtocol', () => {
  //   let component: CommunityComponent;
  //   let fixture: ComponentFixture<CommunityComponent>;
  let aliceDid: BearerDid;
  let bobDid: BearerDid;
  let dwnAlice: DwnApi;
  let dwnBob: DwnApi;
  let testHarness: PlatformAgentTestHarness;
  let testDwnUrls = ['https://dwn.tbddev.org/beta'];

  beforeAll(async () => {
    testHarness = await PlatformAgentTestHarness.setup({
      agentClass: Web5UserAgent,
      agentStores: 'memory',
    });
  });

  beforeEach(async () => {
    await testHarness.clearStorage();
    await testHarness.createAgentDid();

    // Create an "alice" Identity to author the DWN messages.
    const alice = await testHarness.createIdentity({ name: 'Alice', testDwnUrls });
    await testHarness.agent.identity.manage({ portableIdentity: await alice.export() });
    aliceDid = alice.did;

    // Create a "bob" Identity to author the DWN messages.
    const bob = await testHarness.createIdentity({ name: 'Bob', testDwnUrls });
    await testHarness.agent.identity.manage({ portableIdentity: await bob.export() });
    bobDid = bob.did;

    // Instantiate DwnApi for both test identities.
    dwnAlice = new DwnApi({ agent: testHarness.agent, connectedDid: aliceDid.uri });
    dwnBob = new DwnApi({ agent: testHarness.agent, connectedDid: bobDid.uri });

    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatToolbarModule,
        CommonModule,
        MatListModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
      ],
    }).compileComponents();

    // fixture = TestBed.createComponent(CommunityComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  afterAll(async () => {
    await testHarness.clearStorage();
    await testHarness.closeStorage();
  });

  it('should create message protocol and perform actions', async () => {
    // Configure the protocol in both DWNs.
    // const { status: bobProtocolStatus, protocol: bobProtocol } = await dwnBob.protocols.configure({
    //   message: {
    //     definition: profile.definition,
    //   },
    // });
    // expect(bobProtocolStatus.code).toBe(202);

    // const { status: bobRemoteProtocolStatus } = await bobProtocol!.send(bobDid.uri);
    // expect(bobRemoteProtocolStatus.code).toBe(202);

    const { status: aliceProtocolStatus, protocol: aliceProtocol } = await dwnAlice.protocols.configure({
      message: {
        definition: profile.definition,
      },
    });
    expect(aliceProtocolStatus.code).toBe(202);

    const { status: aliceRemoteProtocolStatus } = await aliceProtocol!.send(aliceDid.uri);
    expect(aliceRemoteProtocolStatus.code).toBe(202);

    //  const imageRecordsWrite = await TestDataGenerator.generateRecordsWrite({
    //    author: aliceDid.uri,
    //    protocol: profile.uri,
    //    protocolPath: 'profile', // this comes from `types` in protocol definition
    //    schema: 'https://schema.ariton.app/profile/schema/profile',
    //    dataFormat: 'image/jpeg',
    //    data: { name: 'Alice' },
    //    // recipient    : alice.did
    //  });

    // const dwn = dwnAlice as any;
    // dwn.agent.processDwnRequest({ data: null });

    const { status: profileCreateStatus, record: writerRecord } = await dwnAlice.records.create({
      data: { name: 'Alice' },
      message: {
        // If this is not true, then record still wonæ't be readable.
        // published: true,
        // published: true, /* published ignores the protocol permissions. */
        recipient: bobDid.uri,
        // recipient: aliceDid.uri,
        protocol: profile.uri,
        protocolPath: 'profile',
        schema: 'https://schema.ariton.app/profile/schema/profile',
        dataFormat: 'application/json',
      },
    });

    console.log('YEEESS 2222');

    console.log(profileCreateStatus);
    expect(profileCreateStatus.code).toBe(202);

    // const { status: friendRecordUpdateStatus } = await writerRecord!.update({
    //   data: { name: 'Alice3', reason: 'is still our super employee' },
    // });
    // expect(friendRecordUpdateStatus.code).toBe(202);

    const { status: aliceFriendSendStatus } = await writerRecord!.send(aliceDid.uri);
    expect(aliceFriendSendStatus.code).toBe(202);

    expect(profile.uri).toBeDefined();

    // const response = await dwnBob.records.query({
    //   from: aliceDid.uri,
    //   message: {
    //     filter: {
    //       recordId: writerRecord!.id,
    //     },
    //   },
    // });

    const response = await dwnBob.records.query({
      from: aliceDid.uri,
      message: {
        filter: {
          protocol: profile.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
          schema: 'https://schema.ariton.app/profile/schema/profile',
        },
      },
    });

    console.log(response);
    expect(response.records?.length).toBe(1);

    if (response.records) {
      console.log('YEEEEEEEEEEEEEEEEEEEEESSS 888888');
      const profileData = await response.records[0].data.json();
      console.log(profileData);
    }

    // After getting writer, let us create a new message.
    // const { status: communityCreateStatus, record: messageRecord } = await dwnBob.records.create({
    //   data: { message: 'You are my best friend.' },
    //   message: {
    //     recipient: aliceDid.uri,
    //     protocol: social.uri,
    //     protocolPath: 'message',
    //     protocolRole: 'writer',
    //     schema: 'https://schema.ariton.app/message/schema/message',
    //     dataFormat: 'application/json',
    //   },
    // });
    // expect(communityCreateStatus.code).toBe(202);

    // const { status: bobCommunitySendStatus } = await messageRecord!.send(bobDid.uri);
    // expect(bobCommunitySendStatus.code).toBe(202);

    // const { status: aliceAlbumSendStatus } = await messageRecord!.send(aliceDid.uri);
    // expect(aliceAlbumSendStatus.code).toBe(202);

    // const { record: messageRecord2 } = await dwnBob.records.create({
    //   data: { message: 'You are my best friend.' },
    //   message: {
    //     recipient: aliceDid.uri,
    //     protocol: message.uri,
    //     protocolPath: 'message',
    //     protocolRole: 'writer',
    //     schema: 'https://schema.ariton.app/message/schema/message',
    //     dataFormat: 'application/json',
    //   },
    // });

    // await messageRecord2!.send(bobDid.uri);
    // await messageRecord2!.send(aliceDid.uri);

    // const records = await dwnAlice.records.query({
    //   message: {
    //     filter: {
    //       protocol: message.uri,
    //     },
    //   },
    // });

    // expect(records.records?.length).toBe(1);

    // const data = await records.records![0].data.json();

    // console.log('Data:', data);
    //    console.log('Records:', JSON.stringify(records.records, null, 2));

    // Bob makes Alice a `participant` and sends the record to her and his own remote node.
    // const { status: participantCreateStatus, record: adminRecord } = await dwnBob.records.create({
    //   data: 'test',
    //   message: {
    //     parentContextId: communityRecord!.contextId,
    //     recipient: aliceDid.uri,
    //     protocol: community.uri,
    //     protocolPath: 'community/admin',
    //     schema: 'https://schema.ariton.app/community/schema/admin',
    //     dataFormat: 'application/json',
    //   },
    // });
    // expect(participantCreateStatus.code).toBe(202);

    // const { status: bobParticipantSendStatus } = await adminRecord!.send(bobDid.uri);
    // expect(bobParticipantSendStatus.code).toBe(202);

    // const { status: aliceParticipantSendStatus } = await adminRecord!.send(aliceDid.uri);
    // expect(aliceParticipantSendStatus.code).toBe(202);
  });
});
