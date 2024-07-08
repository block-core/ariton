import { Injectable } from '@angular/core';
import { Pbkdf2, utils } from '@web5/crypto';
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    constructor() {}

    async createPassword(n: number = 6, ent: number = 128) {
        try {
            const mnemonic = generateMnemonic(wordlist, ent).split(' ');
            const words: string[] = [];
            for (let i = 0; i < n; i++) {
                const rand = Math.floor(Math.random() * mnemonic.length);
                words.push(mnemonic[rand]);
            }
            return words.join(' ');
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    encrypt(data: string, password: string): string {
        const key = this.deriveKey(password);
        return data;
    }

    async encryptData(secretData: string, password: string) {}

    async deriveKey(password: string) {
        // Key Derivation
        const derivedKey = await Pbkdf2.deriveKey({
            hash: 'SHA-256', // Hash function to use ('SHA-256', 'SHA-384', 'SHA-512')
            password: new TextEncoder().encode(password), // Password as a Uint8Array
            salt: utils.randomBytes(16), // Salt value
            iterations: 1000, // Number of iterations
            length: 256, // Length of the derived key in bits
        });

        return derivedKey;
    }
}
