// src/app/services/hash.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HashService {
  private hash: string | null = null;

  constructor(private http: HttpClient) {}

  loadHash(): Promise<void> {
    return this.http
      .get('/ngsw.json')
      .toPromise()
      .then((data: any) => {
        this.hash = data.hash;
      })
      .catch(() => {
        this.hash = null;
      });
  }

  getHash(): string | null {
    return this.hash;
  }
}
