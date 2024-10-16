/* eslint no-bitwise: ["error", {"allow": ["<<", ">>", "^", "&", "&="]}] */

// import { base32z } from 'multiformats/bases/base32';
import base32 from 'base32.js';

function verifyChecksum(expected: any, actual: any) {
  if (expected.length !== actual.length) {
    return false;
  }

  if (expected.length === 0) {
    return true;
  }

  for (let i = 0; i < expected.length; i += 1) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }

  return true;
}

const versionBytes = {
  ed25519PublicKey: 6 << 3, // G (when encoded in base32)
  ed25519SecretSeed: 18 << 3, // S
  med25519PublicKey: 12 << 3, // M
  preAuthTx: 19 << 3, // T
  sha256Hash: 23 << 3, // X
  signedPayload: 15 << 3, // P
  contract: 2 << 3, // C
};

const strkeyTypes = {
  G: 'ed25519PublicKey',
  S: 'ed25519SecretSeed',
  M: 'med25519PublicKey',
  T: 'preAuthTx',
  X: 'sha256Hash',
  P: 'signedPayload',
  C: 'contract',
};

/**
 * StrKey is a helper class that allows encoding and decoding Stellar keys
 * to/from strings, i.e. between their binary (Buffer, xdr.PublicKey, etc.) and
 * string (i.e. "GABCD...", etc.) representations.
 */
export class StrKey {
  /**
   * Encodes `data` to strkey ed25519 public key.
   *
   * @param   {Buffer} data   raw data to encode
   * @returns {string}        "G..." representation of the key
   */
  static encodeEd25519PublicKey(data: any) {
    return encodeCheck('ed25519PublicKey', data);
  }

  /**
   * Decodes strkey ed25519 public key to raw data.
   *
   * If the parameter is a muxed account key ("M..."), this will only encode it
   * as a basic Ed25519 key (as if in "G..." format).
   *
   * @param   {string} data   "G..." (or "M...") key representation to decode
   * @returns {Buffer}        raw key
   */
  static decodeEd25519PublicKey(data: any) {
    return decodeCheck('ed25519PublicKey', data);
  }

  /**
   * Returns true if the given Stellar public key is a valid ed25519 public key.
   * @param {string} publicKey public key to check
   * @returns {boolean}
   */
  static isValidEd25519PublicKey(publicKey: any) {
    return isValid('ed25519PublicKey', publicKey);
  }

  /**
   * Encodes data to strkey ed25519 seed.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodeEd25519SecretSeed(data: any) {
    return encodeCheck('ed25519SecretSeed', data);
  }

  /**
   * Decodes strkey ed25519 seed to raw data.
   * @param {string} address data to decode
   * @returns {Buffer}
   */
  static decodeEd25519SecretSeed(address: any) {
    return decodeCheck('ed25519SecretSeed', address);
  }

  /**
   * Returns true if the given Stellar secret key is a valid ed25519 secret seed.
   * @param {string} seed seed to check
   * @returns {boolean}
   */
  static isValidEd25519SecretSeed(seed: any) {
    return isValid('ed25519SecretSeed', seed);
  }

  /**
   * Encodes data to strkey med25519 public key.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodeMed25519PublicKey(data: any) {
    return encodeCheck('med25519PublicKey', data);
  }

  /**
   * Decodes strkey med25519 public key to raw data.
   * @param {string} address data to decode
   * @returns {Buffer}
   */
  static decodeMed25519PublicKey(address: any) {
    return decodeCheck('med25519PublicKey', address);
  }

  /**
   * Returns true if the given Stellar public key is a valid med25519 public key.
   * @param {string} publicKey public key to check
   * @returns {boolean}
   */
  static isValidMed25519PublicKey(publicKey: any) {
    return isValid('med25519PublicKey', publicKey);
  }

  /**
   * Encodes data to strkey preAuthTx.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodePreAuthTx(data: any) {
    return encodeCheck('preAuthTx', data);
  }

  /**
   * Decodes strkey PreAuthTx to raw data.
   * @param {string} address data to decode
   * @returns {Buffer}
   */
  static decodePreAuthTx(address: any) {
    return decodeCheck('preAuthTx', address);
  }

  /**
   * Encodes data to strkey sha256 hash.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodeSha256Hash(data: any) {
    return encodeCheck('sha256Hash', data);
  }

  /**
   * Decodes strkey sha256 hash to raw data.
   * @param {string} address data to decode
   * @returns {Buffer}
   */
  static decodeSha256Hash(address: any) {
    return decodeCheck('sha256Hash', address);
  }

  /**
   * Encodes raw data to strkey signed payload (P...).
   * @param   {Buffer} data  data to encode
   * @returns {string}
   */
  static encodeSignedPayload(data: any) {
    return encodeCheck('signedPayload', data);
  }

  /**
   * Decodes strkey signed payload (P...) to raw data.
   * @param   {string} address  address to decode
   * @returns {Buffer}
   */
  static decodeSignedPayload(address: any) {
    return decodeCheck('signedPayload', address);
  }

  /**
   * Checks validity of alleged signed payload (P...) strkey address.
   * @param   {string} address  signer key to check
   * @returns {boolean}
   */
  static isValidSignedPayload(address: any) {
    return isValid('signedPayload', address);
  }

  /**
   * Encodes raw data to strkey contract (C...).
   * @param   {Buffer} data  data to encode
   * @returns {string}
   */
  static encodeContract(data: any) {
    return encodeCheck('contract', data);
  }

  /**
   * Decodes strkey contract (C...) to raw data.
   * @param   {string} address  address to decode
   * @returns {Buffer}
   */
  static decodeContract(address: any) {
    return decodeCheck('contract', address);
  }

  /**
   * Checks validity of alleged contract (C...) strkey address.
   * @param   {string} address  signer key to check
   * @returns {boolean}
   */
  static isValidContract(address: any) {
    return isValid('contract', address);
  }

  static getVersionByteForPrefix(address: string) {
    return strkeyTypes[address[0] as keyof typeof strkeyTypes];
  }
}

/**
 * Sanity-checks whether or not a strkey *appears* valid.
 *
 * @param  {string}  versionByteName the type of strkey to expect in `encoded`
 * @param  {string}  encoded         the strkey to validate
 *
 * @return {Boolean} whether or not the `encoded` strkey appears valid for the
 *     `versionByteName` strkey type (see `versionBytes`, above).
 *
 * @note This isn't a *definitive* check of validity, but rather a best-effort
 *     check based on (a) input length, (b) whether or not it can be decoded,
 *     and (c) output length.
 */
function isValid(versionByteName: string, encoded: string) {
  if (typeof encoded !== 'string') {
    return false;
  }

  // basic length checks on the strkey lengths
  switch (versionByteName) {
    case 'ed25519PublicKey': // falls through
    case 'ed25519SecretSeed': // falls through
    case 'preAuthTx': // falls through
    case 'sha256Hash': // falls through
    case 'contract':
      if (encoded.length !== 56) {
        return false;
      }
      break;

    case 'med25519PublicKey':
      if (encoded.length !== 69) {
        return false;
      }
      break;

    case 'signedPayload':
      if (encoded.length < 56 || encoded.length > 165) {
        return false;
      }
      break;

    default:
      return false;
  }

  let decoded = '';
  try {
    decoded = decodeCheck(versionByteName, encoded).toString();
  } catch (err) {
    return false;
  }

  // basic length checks on the resulting buffer sizes
  switch (versionByteName) {
    case 'ed25519PublicKey': // falls through
    case 'ed25519SecretSeed': // falls through
    case 'preAuthTx': // falls through
    case 'sha256Hash': // falls through
    case 'contract':
      return decoded.length === 32;

    case 'med25519PublicKey':
      return decoded.length === 40; // +8 bytes for the ID

    case 'signedPayload':
      return (
        // 32 for the signer, +4 for the payload size, then either +4 for the
        // min or +64 for the max payload
        decoded.length >= 32 + 4 + 4 && decoded.length <= 32 + 4 + 64
      );

    default:
      return false;
  }
}

export function decodeCheck(versionByteName: string, encoded: string) {
  if (typeof encoded !== 'string') {
    throw new TypeError('encoded argument must be of type String');
  }

  const decoded = base32.decode(encoded);
  const versionByte = decoded[0];
  const payload = decoded.slice(0, -2);
  const data = payload.slice(1);
  const checksum = decoded.slice(-2);

  if (encoded !== base32.encode(decoded)) {
    throw new Error('invalid encoded string');
  }

  const expectedVersion = versionBytes[versionByteName as keyof typeof versionBytes];

  if (expectedVersion === undefined) {
    throw new Error(
      `${versionByteName} is not a valid version byte name. ` +
        `Expected one of ${Object.keys(versionBytes).join(', ')}`,
    );
  }

  if (versionByte !== expectedVersion) {
    throw new Error(`invalid version byte. expected ${expectedVersion}, got ${versionByte}`);
  }

  const expectedChecksum = calculateChecksum(payload);

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error(`invalid checksum`);
  }

  return new Uint8Array(data);
}

export function encodeCheck(versionByteName: string, data: any) {
  if (data === null || data === undefined) {
    throw new Error('cannot encode null data');
  }

  const versionByte = versionBytes[versionByteName as keyof typeof versionBytes];

  if (versionByte === undefined) {
    throw new Error(
      `${versionByteName} is not a valid version byte name. ` +
        `Expected one of ${Object.keys(versionBytes).join(', ')}`,
    );
  }
  data = new Uint8Array(data);

  const versionBuffer = new Uint8Array([versionByte]);
  const payload = new Uint8Array(versionBuffer.length + data.length);
  payload.set(versionBuffer, 0);
  payload.set(data, versionBuffer.length);

  const checksum = new Uint8Array(calculateChecksum(payload));
  // const unencoded = Buffer.concat([payload, checksum]);

  const unencoded = new Uint8Array(payload.length + checksum.length);
  unencoded.set(payload, 0);
  unencoded.set(checksum, payload.length);

  //   const unencoded = new Uint8Array(payload.length + checksum.length);
  //   payload.set(payload, 0);
  //   payload.set(checksum, payload.length);

  return base32.encode(unencoded);
}

// Computes the CRC16-XModem checksum of `payload` in little-endian order
function calculateChecksum(payload: string | any[] | Uint8Array | Buffer) {
  const crcTable = [
    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad,
    0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a,
    0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b,
    0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
    0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861,
    0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96,
    0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87,
    0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
    0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a,
    0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3,
    0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290,
    0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
    0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e,
    0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f,
    0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c,
    0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
    0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83,
    0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
    0x2e93, 0x3eb2, 0x0ed1, 0x1ef0,
  ];

  let crc16 = 0x0;

  for (let i = 0; i < payload.length; i += 1) {
    const byte = payload[i];
    const lookupIndex = (crc16 >> 8) ^ byte;
    crc16 = (crc16 << 8) ^ crcTable[lookupIndex];
    crc16 &= 0xffff;
  }
  const checksum = new Uint8Array(2);
  checksum[0] = crc16 & 0xff;
  checksum[1] = (crc16 >> 8) & 0xff;
  return checksum;
}
