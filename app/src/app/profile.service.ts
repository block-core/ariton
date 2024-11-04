import { effect, inject, Injectable, signal } from '@angular/core';
import { IdentityService } from './identity.service';
import { profile } from '../protocols';
import { CacheService } from './cache.service';
import { Record } from '@web5/api';
import { CacheTimeout } from './cache-timeout-settings';
import { ConnectionService } from './connection.service';

export interface Profile {
  did: string;
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  profileBanner: string;
  status?: string;
  location?: string;
  links: string[];
  birthDate?: string;
}

export interface ProfileResult {
  record: Record | null;
  avatarRecord: Record | null;
  avatar: any;
  profile: any;
  did: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  identity = inject(IdentityService);

  connection = inject(ConnectionService);

  current = signal<Profile>({
    did: '',
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    profileBanner: '',
    status: '',
    location: '',
    links: [],
    birthDate: '',
  });

  selected = signal<Profile>({
    did: '',
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    profileBanner: '',
    status: '',
    location: '',
    links: [],
    birthDate: '',
  });

  avatar = signal<any>(null);

  avatarSelected = signal<any>(null);

  cache = new CacheService();

  constructor() {
    effect(async () => {
      if (this.identity.initialized() && this.identity.activeIdentity()) {
        console.log('Active account found, loading profile...', this.identity.did);
        this.openCurrentUserProfile(this.identity.did);
      }
    });
  }

  async loadProfile(did: string): Promise<ProfileResult> {
    let result: ProfileResult | null = this.cache.read(did);

    if (result) {
      return result as ProfileResult;
    }

    // TODO: Implement caching of profiles, since this method is
    // called by various directives and code, avoiding too many database queries.
    //Query records with plain text data format
    const response = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          author: did,
          protocol: profile.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    let entry: any = {};
    let recordEntry = null;

    // Did we find a local copy of profile?
    if (response.records && response.records.length > 0) {
      console.log(`Found local copy of profile. Only picking the first one of ${response.records.length} found.`);

      recordEntry = response.records[0];
      let recordJson = await recordEntry.data.json();
      entry = { ...recordJson, id: recordEntry.dataCid, did: recordEntry.creator, created: recordEntry.dateCreated };

      // Load without waiting, so next request will have locally updated record.
      this.loadProfileRemote(did);
    } else {
      // Load remote and wait.
      entry = await this.loadProfileRemote(did);
    }

    var { avatar, avatarRecord } = await this.loadAvatar(did);

    const isFriend = this.connection.friends().find((f) => f.data.did == did) ? true : false;

    // Returns a structure of both the record and the profile.

    result = {
      record: recordEntry,
      avatarRecord: avatarRecord,
      avatar: avatar,
      profile: entry,
      did: did,
      friend: isFriend,
    } as ProfileResult;

    this.cache.save(did, result, CacheTimeout.PROFILE);

    return result;
  }

  async loadAvatar(did: string) {
    var avatarRecord: any = null;
    var avatar: any = null;

    const imageResponse = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          author: did,
          protocol: profile.uri,
          protocolPath: 'avatar',
          dataFormat: 'image/jpeg',
        },
      },
    });

    if (imageResponse.records && imageResponse.records.length > 0) {
      console.log(`Found avatar for user. Selecting the first of ${imageResponse.records.length} found.`);

      const record = imageResponse.records[0];

      avatarRecord = record;
      let image = await record.data.text(); //.blob();
      // this.avatar.set(image);
      avatar = image;

      // Load remotely and import, so next time it's accessed it will render latest.
      this.loadAvatarRemote(did);
    } else {
      let { avatar, avatarRecord } = await this.loadAvatarRemote(did);
      avatar = avatar;
      avatarRecord = avatarRecord;
    }

    return {
      avatar,
      avatarRecord,
    };
  }

  async loadAvatarRemote(did: string) {
    var avatarRecord: any = null;
    var avatar: any = null;

    const imageResponse = await this.identity.web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          author: did,
          protocol: profile.uri,
          protocolPath: 'avatar',
          dataFormat: 'image/jpeg',
        },
      },
    });

    if (imageResponse.records && imageResponse.records.length > 0) {
      const record = imageResponse.records[0];

      // Import without waiting.
      record.import();

      avatarRecord = record;
      let image = await record.data.text();
      avatar = image;
    }

    return { avatar, avatarRecord };
  }

  async loadProfileRemote(did: string) {
    console.log('Loading remote profile:', did);

    // TODO: Implement caching of profiles, since this method is
    // called by various directives and code, avoiding too many database queries.
    // Query records with plain text data format
    const response = await this.identity.web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          author: did,
          protocol: profile.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    let entry: any = {};
    let recordEntry = null;

    if (response.records && response.records.length > 0) {
      console.log(
        `Found a profile remotely. Selecting the first of ${response.records.length} found. Importing it to local DWN.`,
      );
      recordEntry = response.records[0];
      let recordJson = await recordEntry.data.json();
      entry = { ...recordJson, id: recordEntry.dataCid, did: recordEntry.creator, created: recordEntry.dateCreated };

      // TODO: We need a nice way to avoid importing if already exists.
      recordEntry.import();
    } else {
      console.log(`No profile found for user. Returning empty result for ${did}`);
    }

    return entry;
  }

  /** Load and sets the profile to selected and current (if same as logged on user) */
  async openCurrentUserProfile(did: string) {
    console.log('Open current user profile', did);
    const profile = await this.loadProfile(did);
    this.avatar.set(profile.avatar);
    this.current.set(profile.profile as Profile);
  }

  /** Load and sets the profile to selected and current (if same as logged on user) */
  async openProfile(did: string) {
    console.log('Open profile', did);
    const profile = await this.loadProfile(did);

    this.avatarSelected.set(profile.avatar);
    this.selected.set(profile.profile as Profile);

    if (did == this.identity.did) {
      this.avatar.set(profile.avatar);
      this.current.set(profile.profile as Profile);
    }
  }
}
