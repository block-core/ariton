import { inject, Injectable, signal } from '@angular/core';
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

  constructor() {}

  async loadProfile(did: string) {
    //Query records with plain text data format
    const response = await this.identity.web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          protocol: profile.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    let json = {};
    let recordEntry = null;

    console.log('RESPONSE FOUND FOR PROFILE:', response);
    console.log('RECORDS FOUND FOR PROFILE:', response.records);

    if (response.records) {
      // Loop through returned records and print text from each
      for (const record of response.records) {
        recordEntry = record;
        let recordJson = await record.data.json();
        json = { ...recordJson, id: record.dataCid, did: record.author, created: record.dateCreated };
      }
    }

    var avatarRecord: any = null;
    var avatar: any = null;

    // If lookup is for current user, just query local DWN.
    // if (did == this.identity.did) {
    const imageResponse = await this.identity.web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          protocol: profile.uri,
          protocolPath: 'avatar',
          dataFormat: 'image/png',
        },
      },
    });

    if (imageResponse.records && imageResponse.records.length > 0) {
      const record = imageResponse.records[0];
      avatarRecord = record;
      let image = await record.data.text(); //.blob();
      // this.avatar.set(image);

      avatar = image;
      // let image = await record.data.blob();
      // this.current.update((profile) => ({ ...profile, profileImage: URL.createObjectURL
    }
    // }

    // Returns a structure of both the record and the profile.
    return {
      record: recordEntry,
      avatarRecord: avatarRecord,
      avatar: avatar,
      profile: json,
      did: did,
    };
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

    // // If lookup is for current user, just query local DWN.
    // if (did == this.identity.did) {
    //   const imageResponse = await this.identity.web5.dwn.records.query({
    //     message: {
    //       filter: {
    //         protocol: profile.uri,
    //         protocolPath: 'avatar',
    //         dataFormat: 'image/png',
    //       },
    //     },
    //   });

    //   console.log(imageResponse);

    //   if (imageResponse.records && imageResponse.records.length > 0) {
    //     const record = imageResponse.records[0];
    //     let image = await record.data.text(); //.blob();
    //     console.log('Profile image from DWN:', image);
    //     this.avatar.set(image);
    //     // let image = await record.data.blob();
    //     // this.current.update((profile) => ({ ...profile, profileImage: URL.createObjectURL
    //   }

    //   const response = await this.identity.web5.dwn.records.query({
    //     message: {
    //       filter: {
    //         protocol: profile.uri,
    //         protocolPath: 'profile',
    //         dataFormat: 'application/json',
    //       },
    //     },
    //   });

    //   if (response.records) {
    //     response.records.forEach(async (record) => {
    //       let json = await record.data.json();
    //       console.log(json);
    //       json = { ...json, id: record.dataCid, did: record.author, created: record.dateCreated };
    //       this.current.set(json);
    //       console.log(json);
    //       //   this.records.update((records) => [...records, json]);
    //     });
    //   }
    // } else {
    //   // Query for the external user's profile.
    //   console.log('QUERY FOR USER PROFILE!!');
    //   const response = await this.identity.web5.dwn.records.query({
    //     from: did,
    //     message: {
    //       filter: {
    //         protocol: profile.uri,
    //         protocolPath: 'profile',
    //         dataFormat: 'application/json',
    //       },
    //     },
    //   });

    //   console.log('Records in open profile:', response.records);

    //   if (response.records && response.records.length > 0) {
    //     // Loop through returned records and print text from each
    //     response.records.forEach(async (record) => {
    //       let json = await record.data.json();
    //       console.log(json);

    //       json = { ...json, id: record.dataCid, did: record.author, created: record.dateCreated };

    //       this.current.set(json);

    //       console.log(json);

    //       //   this.records.update((records) => [...records, json]);
    //     });
    //   } else {
    //     console.log('NOTHING FOUND!!');
    //     this.current.set({ did: did, bio: '', profileImage: '', profileBanner: '', links: [], title: '', name: 'No profile found' });
    //   }

    //   //   this.records.set([]);
    // }

    // console.log('Open profile', did);
    // this.current.set({
    //     did,
    //     birthDate: '1981',
    //     name: 'SondreB',
    //     title: 'Voluntaryist',
    //     bio: 'I am a voluntaryist.',
    //     profileImage: 'https://ariton.app/assets/sondre.png',
    //     profileBanner: 'https://avatars.githubusercontent.com/u/1402241?v=4',
    //     status: 'Online',
    //     location: 'Norway',
    //     links: ['https://sondreb.com'],
    // });
  }
}
