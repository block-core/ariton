import { Injectable, signal } from '@angular/core';

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
  providedIn: 'root'
})
export class ProfileService {

  current = signal<Profile>({ did: '', name: '', title: '', bio: '', profileImage: '', profileBanner: '', status: '', location: '', links: [], birthDate: ''});

  constructor() { }

  openProfile(did: string) {
    console.log('Open profile', did);
    this.current.set({ did, birthDate: '1981', name: 'SondreB', title: 'Voluntaryist', bio: 'I am a voluntaryist.', profileImage: 'https://ariton.app/assets/sondre.png', profileBanner: 'https://avatars.githubusercontent.com/u/1402241?v=4', status: 'Online', location: 'Norway', links: ['https://sondreb.com']});
  }

  
}
