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
import { community } from './';

describe('CommunityProtocol', () => {
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

  it('should create community protocol and perform actions', async () => {
    // Configure the protocol in both DWNs.
    const { status: bobProtocolStatus, protocol: bobProtocol } = await dwnBob.protocols.configure({
      message: {
        definition: community.definition,
      },
    });
    expect(bobProtocolStatus.code).toBe(202);

    const { status: bobRemoteProtocolStatus } = await bobProtocol!.send(bobDid.uri);
    expect(bobRemoteProtocolStatus.code).toBe(202);

    const { status: aliceProtocolStatus, protocol: aliceProtocol } = await dwnAlice.protocols.configure({
      message: {
        definition: community.definition,
      },
    });
    expect(aliceProtocolStatus.code).toBe(202);

    const { status: aliceRemoteProtocolStatus } = await aliceProtocol!.send(aliceDid.uri);
    expect(aliceRemoteProtocolStatus.code).toBe(202);

    // Now that protocols is installed, assign globalAdmin between users.
    const { status: adminCreateStatus, record: globalAdminRecord } = await dwnAlice.records.create({
      data: { reason: 'is our super employee' },
      message: {
        recipient: bobDid.uri,
        protocol: community.uri,
        protocolPath: 'globalAdmin',
        schema: 'https://schema.ariton.app/community/schema/globalAdmin',
        dataFormat: 'application/json',
      },
    });

    console.log(adminCreateStatus);
    expect(adminCreateStatus.code).toBe(202);

    const { status: friendRecordUpdateStatus } = await globalAdminRecord!.update({
      data: { reason: 'is still our super employee' },
    });
    expect(friendRecordUpdateStatus.code).toBe(202);

    const { status: aliceFriendSendStatus } = await globalAdminRecord!.send(aliceDid.uri);
    expect(aliceFriendSendStatus.code).toBe(202);

    // After getting globalAdmin (employee of Ariton), let us create a new community.
    const { status: communityCreateStatus, record: communityRecord } = await dwnBob.records.create({
      data: 'test',
      message: {
        recipient: aliceDid.uri,
        protocol: community.uri,
        protocolPath: 'community',
        protocolRole: 'globalAdmin',
        schema: 'https://schema.ariton.app/community/schema/community',
        dataFormat: 'application/json',
      },
    });
    expect(communityCreateStatus.code).toBe(202);

    const { status: bobCommunitySendStatus } = await communityRecord!.send(bobDid.uri);
    expect(bobCommunitySendStatus.code).toBe(202);

    const { status: aliceAlbumSendStatus } = await communityRecord!.send(aliceDid.uri);
    expect(aliceAlbumSendStatus.code).toBe(202);

    // Bob makes Alice a `participant` and sends the record to her and his own remote node.
    const { status: participantCreateStatus, record: adminRecord } = await dwnBob.records.create({
      data: 'test',
      message: {
        parentContextId: communityRecord!.contextId,
        recipient: aliceDid.uri,
        protocol: community.uri,
        protocolPath: 'community/admin',
        schema: 'https://schema.ariton.app/community/schema/admin',
        dataFormat: 'application/json',
      },
    });
    expect(participantCreateStatus.code).toBe(202);

    // const { status: bobParticipantSendStatus } = await adminRecord!.send(bobDid.uri);
    // expect(bobParticipantSendStatus.code).toBe(202);

    // const { status: aliceParticipantSendStatus } = await adminRecord!.send(aliceDid.uri);
    // expect(aliceParticipantSendStatus.code).toBe(202);
  });
});
