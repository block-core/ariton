import { effect, inject, Injectable, signal } from '@angular/core';
import { IdentityService } from './identity.service';
import { profile } from '../protocols';

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

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  identity = inject(IdentityService);

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

  constructor() {
    effect(async () => {
      if (this.identity.activeAccount()) {
        console.log('Active account found, loading profile...', this.identity.did);
        this.openCurrentUserProfile(this.identity.did);
      }
    });
  }

  async loadProfile(did: string) {
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

    console.log('RESPONSE FOUND FOR PROFILE:', response);
    console.log('RECORDS FOUND FOR PROFILE1:', response.records);

    if (response.records && response.records.length > 0) {
      // Loop through returned records and print text from each
      for (const record of response.records) {
        // Import the profile record to our local DWN. This way we can quickly access it later.
        record.import();

        console.log('IMPORTING PROFILE RECORD:', record);

        recordEntry = record;
        let recordJson = await record.data.json();
        entry = { ...recordJson, id: record.dataCid, did: record.creator, created: record.dateCreated };

        // Load without waiting, so next request will have locally updated record.
        this.loadProfileRemote(did);
      }
    } else {
      entry = await this.loadProfileRemote(did);
    }

    var { avatar, avatarRecord } = await this.loadAvatar(did);

    // Returns a structure of both the record and the profile.
    return {
      record: recordEntry,
      avatarRecord: avatarRecord,
      avatar: avatar,
      profile: entry,
      did: did,
    };
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

    console.log('QUERY FOR PROFILE WORKS??');

    let entry: any = {};
    let recordEntry = null;

    console.log('RESPONSE FOUND FOR PROFILE:', response);
    console.log('RECORDS FOUND FOR PROFILE2:', response.records);

    if (response.records) {
      // Loop through returned records and print text from each
      for (const record of response.records) {
        // Import the profile record to our local DWN. This way we can quickly access it later.
        record.import();

        recordEntry = record;
        let recordJson = await record.data.json();
        entry = { ...recordJson, id: record.dataCid, did: record.creator, created: record.dateCreated };
      }
    }

    return entry;
  }

  /** Load and sets the profile to selected and current (if same as logged on user) */
  async openCurrentUserProfile(did: string) {
    console.log('Open current user profile', did);
    const profile = await this.loadProfile(did);
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
