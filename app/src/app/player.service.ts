import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  title = signal<string>('');

  audio?: HTMLAudioElement;

  constructor() {}

  previous() {}

  next() {}

  async play() {
    const url = 'https://file-examples.com/storage/fefcab211666f32e693a865/2017/11/file_example_MP3_700KB.mp3';
    this.setTitle(url);

    if (!this.audio) {
      this.audio = new Audio(url);
    }

    await this.audio.play();
  }

  setTitle(url: string) {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    this.title = signal<string>(filename);
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  get paused() {
    // if (this.videoMode) {
    //   return this.youtubeUrl == null;
    // } else {
    if (!this.audio) {
      return true;
    }

    return this.audio.paused;
    // }
  }
}
