import { ChangeDetectorRef, EventEmitter, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  title = signal<string>('');

  audio?: HTMLAudioElement;

  public timeUpdateEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.init();
  }

  init() {
    navigator.mediaSession.setActionHandler('play', async () => {
      // Resume playback
      try {
        if (this.audio) {
          await this.audio.play();
        }
      } catch (err: any) {
        console.error(err.name, err.message);
      }
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      // Pause active playback
      if (this.audio) {
        this.audio.pause();
      }
    });

    // if ('mediaSession' in navigator) {
    //   navigator.mediaSession.metadata = new MediaMetadata({
    //     title: 'Podcast Episode Title',
    //     artist: 'Podcast Host',
    //     album: 'Podcast Name',
    //     artwork: [{ src: 'podcast.jpg' }],
    //   });
    // }

    // audio.addEventListener('play', () => {
    //   navigator.mediaSession.playbackState = 'playing';
    // });

    // audio.addEventListener('pause', () => {
    //   navigator.mediaSession.playbackState = 'paused';
  }

  previous() {}

  next() {}

  onTimeUpdate(callback: (currentTime: number) => void): void {
    this.timeUpdateEvent.subscribe(callback);
  }

  createAudio(url: string) {
    if (!this.audio) {
      this.audio = new Audio(url);

      this.audio.addEventListener('timeupdate', () => {
        if (!this.audio) {
          return;
        }

        this.timeUpdateEvent.emit(this.audio.currentTime);
      });
    }

    return this.audio;
  }

  async play() {
    const url = 'https://file-examples.com/storage/fefcab211666f32e693a865/2017/11/file_example_MP3_700KB.mp3';
    this.setTitle(url);

    if (!this.audio) {
      this.audio = this.createAudio(url);
    }

    await this.audio.play();
  }

  setTitle(url: string) {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    this.title = signal<string>(filename);

    navigator.mediaSession.metadata = new MediaMetadata({
      title: filename,
      artist: filename,
      album: 'Ariton',
      artwork: [{ src: filename }],
    });

    navigator.mediaSession.playbackState = 'playing';
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }

    navigator.mediaSession.playbackState = 'paused';
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

  get time() {
    if (!this.audio) {
      return 10;
    }

    return Math.floor(this.audio.currentTime);
  }

  set time(value) {
    if (!this.audio) {
      return;
    }

    this.audio.currentTime = value;
  }

  get duration() {
    if (!this.audio) {
      return 100;
    }

    return Math.floor(this.audio.duration);
  }

  rate() {
    if (!this.audio) {
      return;
    }

    console.log(this.audio.playbackRate);

    if (this.audio.playbackRate == 2.0) {
      this.audio.playbackRate = 1.0;
    } else {
      this.audio.playbackRate = 2.0;
    }
  }
}
