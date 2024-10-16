import type { RequireOnly } from '@web5/common';
import type {
  Jwk,
  CryptoApi,
  KeyCompressor,
  KeyIdentifier,
  KmsExportKeyParams,
  KmsImportKeyParams,
  KeyImporterExporter,
  AsymmetricKeyConverter,
  InferKeyGeneratorAlgorithm,
} from '@web5/crypto';
import { universalTypeOf } from '@web5/common';
import { X25519, Ed25519, Secp256k1, Secp256r1, LocalKeyManager, computeJwkThumbprint } from '@web5/crypto';
import {
  BearerDid,
  Did,
  DidCreateOptions,
  DidCreateVerificationMethod,
  DidDocument,
  DidError,
  DidErrorCode,
  DidKeyCreateOptions,
  DidMetadata,
  DidMethod,
  DidResolutionOptions,
  DidResolutionResult,
  DidVerificationMethod,
  EMPTY_DID_RESOLUTION_RESULT,
  KeyWithMulticodec,
  PortableDid,
} from '@web5/dids';
import { getVerificationMethodTypes, keyBytesToMultibaseId, multibaseIdToKeyBytes } from '@web5/dids/utils';
import { StrKey } from './strkey';

export interface DidStellarCreateOptions<TKms> extends DidCreateOptions<TKms> {
  /**
   * Optionally specify an array of JSON-LD context links for the @context property of the DID
   * document.
   *
   * The @context property provides a JSON-LD processor with the information necessary to interpret
   * the DID document JSON. The default context URL is 'https://www.w3.org/ns/did/v1'.
   */
  defaultContext?: string;

  /**
   * Alternatively, specify the algorithm to be used for key generation of the single verification
   * method in the DID Document.
   */
  verificationMethods?: DidCreateVerificationMethod<TKms>[];
}

export enum DidStellarRegisteredKeyType {
  /**
   * Ed25519: A public-key signature system using the EdDSA (Edwards-curve Digital Signature
   * Algorithm) and Curve25519.
   */
  Ed25519 = 'Ed25519',
}

/**
 * Enumerates the verification method types supported by the DID Key method.
 *
 * This enum defines the URIs associated with common verification methods used in DID Documents.
 * These URIs represent cryptographic suites or key types standardized for use across decentralized
 * identifiers (DIDs).
 */
export const DidKeyVerificationMethodType = {
  /** Represents an Ed25519 public key used for digital signatures. */
  Ed25519VerificationKey2020: 'https://w3id.org/security/suites/ed25519-2020/v1',

  /** Represents a JSON Web Key (JWK) used for digital signatures and key agreement protocols. */
  JsonWebKey2020: 'https://w3id.org/security/suites/jws-2020/v1',

  /** Represents an X25519 public key used for key agreement protocols. */
  X25519KeyAgreementKey2020: 'https://w3id.org/security/suites/x25519-2020/v1',
} as const;

const AlgorithmToKeyTypeMap = {
  Ed25519: DidStellarRegisteredKeyType.Ed25519,
} as const;

export class DidStellar extends DidMethod {
  /**
   * Name of the DID method, as defined in the DID Key specification.
   */
  public static methodName = 'stellar';

  public static async create<TKms extends CryptoApi | undefined = undefined>({
    keyManager = new LocalKeyManager(),
    options = {},
  }: {
    keyManager?: TKms;
    options?: DidKeyCreateOptions<TKms>;
  } = {}): Promise<BearerDid> {
    // Before processing the create operation, validate DID-method-specific requirements to prevent
    // keys from being generated unnecessarily.

    // Check 1: Validate that `algorithm` or `verificationMethods` options are not both given.
    if (options.algorithm && options.verificationMethods) {
      throw new Error(`The 'algorithm' and 'verificationMethods' options are mutually exclusive`);
    }

    // Check 2: If `verificationMethods` is given, it must contain exactly one entry since DID Key
    // only supports a single verification method.
    if (options.verificationMethods && options.verificationMethods.length !== 1) {
      throw new Error(`The 'verificationMethods' option must contain exactly one entry`);
    }

    // Default to Ed25519 key generation if an algorithm is not given.
    const algorithm = options.algorithm ?? options.verificationMethods?.[0]?.algorithm ?? 'Ed25519';

    // Generate a new key using the specified `algorithm`.
    const keyUri = await keyManager.generateKey({ algorithm });
    const publicKey = await keyManager.getPublicKey({ keyUri });

    // Compute the DID identifier from the public key by converting the JWK to a multibase-encoded
    // multicodec value.
    // const identifier = await DidKeyUtils.publicKeyToMultibaseId({ publicKey });

    const publicKeyBytes = await Ed25519.publicKeyToBytes({ publicKey });

    const identifier = StrKey.encodeEd25519PublicKey(publicKeyBytes);

    // Attach the prefix `did:key` to form the complete DID URI.
    const didUri = `did:${DidStellar.methodName}:${identifier}`;

    // Expand the DID URI string to a DID document.
    const didResolutionResult = await DidStellar.resolve(didUri, options);
    const document = didResolutionResult.didDocument as DidDocument;

    // Create the BearerDid object from the generated key material.
    const did = new BearerDid({
      uri: didUri,
      document,
      metadata: {},
      keyManager,
    });

    return did;
  }

  public static async create2<TKms extends CryptoApi | undefined = undefined>({
    keyManager = new LocalKeyManager(),
    options = {},
  }: {
    keyManager?: TKms;
    options?: DidKeyCreateOptions<TKms>;
  } = {}): Promise<BearerDid> {
    // Before processing the create operation, validate DID-method-specific requirements to prevent
    // keys from being generated unnecessarily.

    // Check 1: Validate that `algorithm` or `verificationMethods` options are not both given.
    if (options.algorithm && options.verificationMethods) {
      throw new Error(`The 'algorithm' and 'verificationMethods' options are mutually exclusive`);
    }

    // Check 2: If `verificationMethods` is given, it must contain exactly one entry since DID Key
    // only supports a single verification method.
    if (options.verificationMethods && options.verificationMethods.length !== 1) {
      throw new Error(`The 'verificationMethods' option must contain exactly one entry`);
    }

    // Default to Ed25519 key generation if an algorithm is not given.
    const algorithm = options.algorithm ?? options.verificationMethods?.[0]?.algorithm ?? 'Ed25519';

    const manager = keyManager as LocalKeyManager;

    // Generate a new key using the specified `algorithm`.
    const keyUri = await keyManager.generateKey({ algorithm });
    const publicKey = await keyManager.getPublicKey({ keyUri });

    const privateKey = await manager.exportKey({ keyUri });
    console.log('privateKey', privateKey);

    // From official documentation: https://github.com/stellar-deprecated/docs/blob/master/guides/get-started/create-account.md
    const privateKeyText = 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7';
    const publicKeyText = 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';

    const privateKeyArray = StrKey.decodeEd25519SecretSeed(privateKeyText);

    // Convert private key from bytes to JWK format.
    const privateKeyJwk = await Ed25519.bytesToPrivateKey({ privateKeyBytes: privateKeyArray });
    console.log('privateKeyJwk', privateKeyJwk);

    const publicKeyJwk = await Ed25519.getPublicKey({ key: privateKeyJwk });
    console.log('publicKeyJwk', publicKeyJwk);

    const publicKeyBytes = await Ed25519.publicKeyToBytes({
      publicKey: publicKeyJwk,
    });

    const identifier = StrKey.encodeEd25519PublicKey(publicKeyBytes);

    // Use the Stellar identifier as the key ID.
    privateKeyJwk.kid = identifier;

    const uri1 = await manager.getKeyUri({ key: privateKeyJwk });
    const uri2 = await manager.getKeyUri({ key: publicKeyJwk });

    if (uri1 === uri2) {
      console.log('Yipppppi!!');
    }

    const result = await manager.importKey({ key: privateKeyJwk });
    console.log('Import result: ', result);

    const exportedKey = await manager.exportKey({ keyUri: uri1 });

    if (exportedKey.d == privateKeyJwk.d) {
      console.log('Yipppppi!! PRIVATE KEY SAME!');
    }

    if (publicKeyText == identifier) {
      console.log('CORRECT!!!!');
    } else {
      console.warn('NO!!!!!!');
    }

    //

    // publicKeyText !== identifier  :-(

    // if (publicKeyText == identifier) {
    //   console.log('CORRECT!!!!');
    // } else {
    //   console.warn('NO!!!!!!');
    // }

    // Compute the JWK thumbprint and set as the key ID.
    privateKeyJwk.kid = await computeJwkThumbprint({ jwk: privateKey });

    // const publicKeyBytes = await Ed25519.publicKeyToBytes({
    //   publicKey: publicKeyJwk,
    // });

    // const identifier = StrKey.encodeEd25519PublicKey(privateKeyArray);
    privateKeyJwk.kid = identifier;

    // let publicKeyBytes = await DidKeyUtils.keyConverter(publicKey.crv!).publicKeyToBytes({ publicKey });
    // privateKeyJwk.kid = await computeJwkThumbprint({ jwk: privateKey });

    // privateKey.kid = await computeJwkThumbprint({ jwk: privateKey });

    // import { Ed25519 } from '@web5/crypto';

    // Key Generation
    // const privateKey = await Ed25519.generateKey();

    // let publicKeyFromPrivate = await DidKeyUtils.keyConverter();

    // const identifier3 = StrKey.encodeEd25519PublicKey(privateKeyArray);
    StrKey.encodeEd25519PublicKey;
    console.log('IDENTIFIER3: ', identifier);

    if (publicKeyText == identifier) {
      console.log('CORRECT!!!!');
    } else {
      console.warn('NO!!!!!!');
    }

    let privateKeyBytes = await DidKeyUtils.keyConverter(privateKey.crv!).privateKeyToBytes({ privateKey });
    console.log('privateKeyBytes', privateKeyBytes);
    // Compute the DID identifier from the public key by converting the JWK to a multibase-encoded
    // multicodec value.
    // const identifier = await DidKeyUtils.publicKeyToMultibaseId({ publicKey });

    // const identifier2 = await DidKeyUtils.publicKeyToMultibaseId({ publicKey });

    // Convert the public key from JWK format to a byte array.
    // let publicKeyBytes = await DidKeyUtils.keyConverter(publicKey.crv!).publicKeyToBytes({ publicKey });
    // // let privateKeyBytes = await DidKeyUtils.keyConverter(keyUri).privateKeyToBytes({ keyUri });

    // console.log(publicKeyBytes);
    // console.log('keyUri', keyUri);

    // // DidKeyUtils.publicKeyToMultibaseId({ publicKey });

    // const identifier = StrKey.encodeEd25519PublicKey(publicKeyBytes);
    // const secret = encodeEd25519SecretSeed();

    console.log('Secret: ', StrKey.encodeEd25519SecretSeed(privateKeyBytes));

    // Attach the prefix `did:key` to form the complete DID URI.
    const didUri = `did:${DidStellar.methodName}:${identifier}`;

    // Expand the DID URI string to a DID document.
    const didResolutionResult = await DidStellar.resolve(didUri, options);
    const document = didResolutionResult.didDocument as DidDocument;

    // Create the BearerDid object from the generated key material.
    const did = new BearerDid({
      uri: didUri,
      document,
      metadata: {},
      keyManager,
    });

    return did;
  }

  public static async fromPrivateKey({
    keyManager = new LocalKeyManager(),
    privateKey,
  }: // options = {},
  {
    // keyManager?: CryptoApi & KeyImporterExporter<KmsImportKeyParams, KeyIdentifier, KmsExportKeyParams>;
    keyManager?: LocalKeyManager;
    privateKey: string;
    // options: DidKeyCreateOptions<CryptoApi | undefined>;
  }): Promise<BearerDid> {
    const privateKeyArray = StrKey.decodeEd25519SecretSeed(privateKey);

    // Convert private key from bytes to JWK format.
    const privateKeyJwk = await Ed25519.bytesToPrivateKey({ privateKeyBytes: privateKeyArray });

    // Store the private key in the key manager.
    const keyUri = await keyManager.importKey({ key: privateKeyJwk });

    const publicKeyJwk = await keyManager.getPublicKey({ keyUri });
    //  const publicKeyJwk = await Ed25519.getPublicKey({ key: privateKeyJwk });

    const publicKeyBytes = await Ed25519.publicKeyToBytes({
      publicKey: publicKeyJwk,
    });

    const identifier = StrKey.encodeEd25519PublicKey(publicKeyBytes);

    // const publicKeyBytes = await Ed25519.publicKeyToBytes({ publicKey });
    // const identifier = StrKey.encodeEd25519PublicKey(publicKeyBytes);

    // Attach the prefix `did:jwk` to form the complete DID URI.
    const didUri = `did:${DidStellar.methodName}:${identifier}`;

    // Expand the DID URI string to a DID document.
    const didResolutionResult = await DidStellar.resolve(didUri, {});
    console.log('didResolutionResult', didResolutionResult);
    const didDocument = didResolutionResult.didDocument as DidDocument;

    // DID Metadata is initially empty for this DID method.
    const metadata: DidMetadata = {};

    // Create the BearerDid object from the generated key material.
    const did = new BearerDid({
      uri: didUri,
      document: didDocument,
      metadata: metadata,
      keyManager,
    });

    return did;
  }

  /**
   * Given the W3C DID Document of a `did:stellar` DID, return the verification method that will be used
   * for signing messages and credentials. With DID Stellar, the first verification method in the
   * authentication property in the DID Document is used.
   *
   * Note that for DID Stellar, only one verification method intended for signing can exist so
   * specifying `methodId` could be considered redundant or unnecessary. The option is provided for
   * consistency with other DID method implementations.
   *
   * @param params - The parameters for the `getSigningMethod` operation.
   * @param params.didDocument - DID Document to get the verification method from.
   * @param params.methodId - ID of the verification method to use for signing.
   * @returns Verification method to use for signing.
   */
  public static override async getSigningMethod({
    didDocument,
  }: {
    didDocument: DidDocument;
    methodId?: string;
  }): Promise<DidVerificationMethod> {
    // Verify the DID method is supported.
    const parsedDid = Did.parse(didDocument.id);
    if (parsedDid && parsedDid.method !== this.methodName) {
      throw new DidError(DidErrorCode.MethodNotSupported, `Method not supported: ${parsedDid.method}`);
    }

    // Attempt to ge the first verification method intended for signing claims.
    const [methodId] = didDocument.assertionMethod || [];
    const verificationMethod = didDocument.verificationMethod?.find((vm) => vm.id === methodId);

    if (!(verificationMethod && verificationMethod.publicKeyJwk)) {
      throw new DidError(
        DidErrorCode.InternalError,
        'A verification method intended for signing could not be determined from the DID Document',
      );
    }

    return verificationMethod;
  }

  /**
   * Instantiates a {@link BearerDid} object for the DID Key method from a given {@link PortableDid}.
   *
   * This method allows for the creation of a `BearerDid` object using a previously created DID's
   * key material, DID document, and metadata.
   *
   * @remarks
   * The `verificationMethod` array of the DID document must contain exactly one key since the
   * `did:stellar` method only supports a single verification method.
   *
   * @example
   * ```ts
   * // Export an existing BearerDid to PortableDid format.
   * const portableDid = await did.export();
   * // Reconstruct a BearerDid object from the PortableDid.
   * const did = await DidKey.import({ portableDid });
   * ```
   *
   * @param params - The parameters for the import operation.
   * @param params.portableDid - The PortableDid object to import.
   * @param params.keyManager - Optionally specify an external Key Management System (KMS) used to
   *                            generate keys and sign data. If not given, a new
   *                            {@link LocalKeyManager} instance will be created and
   *                            used.
   * @returns A Promise resolving to a `BearerDid` object representing the DID formed from the provided keys.
   * @throws An error if the DID document does not contain exactly one verification method.
   */
  public static async import({
    portableDid,
    keyManager = new LocalKeyManager(),
  }: {
    keyManager?: CryptoApi & KeyImporterExporter<KmsImportKeyParams, KeyIdentifier, KmsExportKeyParams>;
    portableDid: PortableDid;
  }): Promise<BearerDid> {
    // Verify the DID method is supported.
    const parsedDid = Did.parse(portableDid.uri);
    if (parsedDid?.method !== DidStellar.methodName) {
      throw new DidError(DidErrorCode.MethodNotSupported, `Method not supported`);
    }

    // Use the given PortableDid to construct the BearerDid object.
    const did = await BearerDid.import({ portableDid, keyManager });

    // Validate that the given DID document contains exactly one verification method.
    // Note: The non-undefined assertion is necessary because the type system cannot infer that
    // the `verificationMethod` property is defined -- which is checked by `BearerDid.import()`.
    if (did.document.verificationMethod!.length !== 1) {
      throw new DidError(DidErrorCode.InvalidDidDocument, `DID document must contain exactly one verification method`);
    }

    return did;
  }

  /**
   * Resolves a `did:stellar` identifier to a DID Document.
   *
   * @param didUri - The DID to be resolved.
   * @param options - Optional parameters for resolving the DID.
   * @returns A Promise resolving to a {@link DidResolutionResult} object representing the result of the resolution.
   */
  public static override async resolve(didUri: string, options?: DidResolutionOptions): Promise<DidResolutionResult> {
    try {
      // Attempt to expand the DID URI string to a DID document.
      const didDocument = await DidStellar.createDocument({ didUri, options });

      // If the DID document was created successfully, return it.
      return {
        ...EMPTY_DID_RESOLUTION_RESULT,
        didDocument,
      };
    } catch (error: any) {
      // Rethrow any unexpected errors that are not a `DidError`.
      if (!(error instanceof DidError)) throw new Error(error);

      // Return a DID Resolution Result with the appropriate error code.
      return {
        ...EMPTY_DID_RESOLUTION_RESULT,
        didResolutionMetadata: {
          error: error.code,
          ...(error.message && { errorMessage: error.message }),
        },
      };
    }
  }

  /**
   * Expands a did:stellar identifier to a DID Document.
   *
   * Reference: https://w3c-ccg.github.io/did-method-key/#document-creation-algorithm
   *
   * @param options
   * @returns - A DID dodcument.
   */
  private static async createDocument({
    didUri,
    options = {},
  }: {
    didUri: string;
    options?: Exclude<DidStellarCreateOptions<CryptoApi>, 'algorithm' | 'verificationMethods'> | DidResolutionOptions;
  }): Promise<DidDocument> {
    const { defaultContext = 'https://www.w3.org/ns/did/v1' } = options;

    /**
     * 1. Initialize document to an empty object.
     */
    const didDocument: DidDocument = { id: didUri };

    /**
     * 2. Using a colon (:) as the delimiter, split the identifier into its
     * components: a scheme, a method, a version, and a multibaseValue.
     * If there are only three components set the version to the string
     * value 1 and use the last value as the multibaseValue.
     */
    const parsedDid = Did.parse(didUri);
    if (!parsedDid) {
      throw new DidError(DidErrorCode.InvalidDid, `Invalid DID URI: ${didUri}`);
    }
    // const multibaseValue = parsedDid.id;
    const identifier = parsedDid.id;

    const publicKeyBytes = StrKey.decodeEd25519PublicKey(identifier);

    const publicKeyJwk = await Ed25519.bytesToPublicKey({ publicKeyBytes });

    /**
     * 3. Check the validity of the input identifier.
     * The scheme MUST be the value did. The method MUST be the value key.
     * The version MUST be convertible to a positive integer value. The
     * multibaseValue MUST be a string and begin with the letter z. If any
     * of these requirements fail, an invalidDid error MUST be raised.
     */
    if (parsedDid.method !== DidStellar.methodName) {
      throw new DidError(DidErrorCode.MethodNotSupported, `Method not supported: ${parsedDid.method}`);
    }

    if (!DidStellar.validateIdentifier(parsedDid)) {
      throw new DidError(DidErrorCode.InvalidDid, `Invalid DID URI: ${didUri}`);
    }

    /**
     * 4. Initialize the signatureVerificationMethod to the result of passing
     * identifier, multibaseValue, and options to a
     *  {@link https://w3c-ccg.github.io/did-method-key/#signature-method-creation-algorithm | Signature Method Creation Algorithm}.
     */
    // const signatureVerificationMethod = await DidStellar.createSignatureMethod({
    //   didUri,
    //   multibaseValue,
    //   options: { enableExperimentalPublicKeyTypes, publicKeyFormat },
    // });

    const keyUri = `${didDocument.id}#0`;

    const signatureVerificationMethod = {
      id: keyUri,
      type: 'JsonWebKey',
      controller: didDocument.id,
      publicKeyJwk: publicKeyJwk,
    };

    /**
     * 5. Set document.id to identifier. If document.id is not a valid DID,
     * an invalidDid error MUST be raised.
     *
     * Note: Identifier was already confirmed to be valid in Step 3, so
     *       skipping the redundant validation.
     */
    didDocument.id = parsedDid.uri;

    /**
     * 6. Initialize the verificationMethod property in document to an array
     * where the first value is the signatureVerificationMethod.
     */
    didDocument.verificationMethod = [signatureVerificationMethod];

    /**
     * 7. Initialize the authentication, assertionMethod, capabilityInvocation,
     * and the capabilityDelegation properties in document to an array where
     * the first item is the value of the id property in
     * signatureVerificationMethod.
     */
    didDocument.authentication = [signatureVerificationMethod.id];
    didDocument.assertionMethod = [signatureVerificationMethod.id];
    didDocument.capabilityInvocation = [signatureVerificationMethod.id];
    didDocument.capabilityDelegation = [signatureVerificationMethod.id];
    didDocument.keyAgreement = [signatureVerificationMethod.id];

    /**
     * 9. Initialize the @context property in document to the result of passing document and options to the Context
     * Creation algorithm.
     */
    // Set contextArray to an array that is initialized to options.defaultContext.
    const contextArray = [defaultContext];

    // For every object in every verification relationship listed in document,
    // add a string value to the contextArray based on the object type value,
    // if it doesn't already exist, according to the following table:
    // {@link https://w3c-ccg.github.io/did-method-key/#context-creation-algorithm | Context Type URL}
    const verificationMethodTypes = getVerificationMethodTypes({ didDocument });
    verificationMethodTypes.forEach((typeName: string) => {
      const typeUrl = DidKeyVerificationMethodType[typeName as keyof typeof DidKeyVerificationMethodType];
      contextArray.push(typeUrl);
    });
    didDocument['@context'] = contextArray;

    // TODO: HANDLE DWN ENDPOINTS FOR DID STELLAR!
    // const serviceEndpointNodes = techPreview?.dwnEndpoints ??
    //   didCreateOptions?.dwnEndpoints ?? ['https://dwn.tbddev.org/beta'];

    // Add the default DWN for Stellar DIDs:
    didDocument.service = [
      {
        id: 'dwn',
        type: 'DecentralizedWebNode',
        serviceEndpoint: ['https://dwn.tbddev.org/beta'],
        enc: '#enc',
        sig: '#sig',
      },
    ];

    /**
     * 10. Return document.
     */
    return didDocument;
  }

  /**
   * Transform a multibase-encoded multicodec value to public encryption key
   * components that are suitable for encrypting messages to a receiver. A
   * mathematical proof elaborating on the safety of performing this operation
   * is available in:
   * {@link https://eprint.iacr.org/2021/509.pdf | On using the same key pair for Ed25519 and an X25519 based KEM}
   */
  private static async deriveEncryptionKey({
    multibaseValue,
  }: {
    multibaseValue: string;
  }): Promise<RequireOnly<KeyWithMulticodec, 'keyBytes' | 'multicodecCode'>> {
    /**
     * 1. Set publicEncryptionKey to an empty object.
     */
    let publicEncryptionKey: RequireOnly<KeyWithMulticodec, 'keyBytes' | 'multicodecCode'> = {
      keyBytes: new Uint8Array(),
      multicodecCode: 0,
    };

    /**
     * 2. Decode multibaseValue using the base58-btc multibase alphabet and
     * set multicodecValue to the multicodec header for the decoded value.
     * Implementers are cautioned to ensure that the multicodecValue is set
     * to the result after performing varint decoding.
     *
     * 3. Set the rawPublicKeyBytes to the bytes remaining after the multicodec
     * header.
     */
    const { keyBytes: publicKeyBytes, multicodecCode: multicodecValue } = multibaseIdToKeyBytes({
      multibaseKeyId: multibaseValue,
    });

    /**
     * 4. If the multicodecValue is 0xed (Ed25519 public key), derive a public X25519 encryption key
     * by using the raw publicKeyBytes and the algorithm defined in
     * {@link https://datatracker.ietf.org/doc/html/draft-ietf-core-oscore-groupcomm | Group OSCORE - Secure Group Communication for CoAP}
     * for Curve25519 in Section 2.4.2: ECDH with Montgomery Coordinates and set
     * generatedPublicEncryptionKeyBytes to the result.
     */
    if (multicodecValue === 0xed) {
      const ed25519PublicKey = await DidKeyUtils.keyConverter('Ed25519').bytesToPublicKey({
        publicKeyBytes,
      });
      const generatedPublicEncryptionKey = await Ed25519.convertPublicKeyToX25519({
        publicKey: ed25519PublicKey,
      });
      const generatedPublicEncryptionKeyBytes = await DidKeyUtils.keyConverter('Ed25519').publicKeyToBytes({
        publicKey: generatedPublicEncryptionKey,
      });

      /**
       * 5. Set multicodecValue to 0xec.
       * 6. Set raw public keyBytes to generatedPublicEncryptionKeyBytes.
       */
      publicEncryptionKey = {
        keyBytes: generatedPublicEncryptionKeyBytes,
        multicodecCode: 0xec,
      };
    }

    /**
     * 7. Return publicEncryptionKey.
     */
    return publicEncryptionKey;
  }

  /**
   * Validates the structure and components of a DID URI against the `did:key` method specification.
   *
   * @param parsedDid - An object representing the parsed components of a DID URI, including the
   *                    scheme, method, and method-specific identifier.
   * @returns `true` if the DID URI meets the `did:key` method's structural requirements, `false` otherwise.
   *
   */
  private static validateIdentifier(parsedDid: Did): boolean {
    const { method, id: multibaseValue } = parsedDid;
    const [scheme] = parsedDid.uri.split(':', 1);

    /**
     * Note: The W3C DID specification makes no mention of a version value being part of the DID
     *       syntax.  Additionally, there does not appear to be any real-world usage of the version
     *       number. Consequently, this implementation will ignore the version related guidance in
     *       the did:key specification.
     */
    const version = '1';

    return (
      scheme === 'did' &&
      method === 'stellar' &&
      Number(version) > 0 &&
      universalTypeOf(multibaseValue) === 'String' &&
      multibaseValue.startsWith('G')
    );
  }
}

/**
 * The `DidKeyUtils` class provides utility functions to support operations in the DID Key method.
 */
export class DidKeyUtils {
  /**
   * A mapping from JSON Web Key (JWK) property descriptors to multicodec names.
   *
   * This mapping is used to convert keys in JWK (JSON Web Key) format to multicodec format.
   *
   * @remarks
   * The keys of this object are strings that describe the JOSE key type and usage,
   * such as 'Ed25519:public', 'Ed25519:private', etc. The values are the corresponding multicodec
   * names used to represent these key types.
   *
   * @example
   * ```ts
   * const multicodecName = JWK_TO_MULTICODEC['Ed25519:public'];
   * // Returns 'ed25519-pub', the multicodec name for an Ed25519 public key
   * ```
   */
  private static JWK_TO_MULTICODEC: { [key: string]: string } = {
    'Ed25519:public': 'ed25519-pub',
    'Ed25519:private': 'ed25519-priv',
    'secp256k1:public': 'secp256k1-pub',
    'secp256k1:private': 'secp256k1-priv',
    'X25519:public': 'x25519-pub',
    'X25519:private': 'x25519-priv',
  };

  /**
   * Defines the expected byte lengths for public keys associated with different cryptographic
   * algorithms, indexed by their multicodec code values.
   */
  public static MULTICODEC_PUBLIC_KEY_LENGTH: Record<number, number> = {
    // secp256k1-pub - Secp256k1 public key (compressed) - 33 bytes
    0xe7: 33,

    // x25519-pub - Curve25519 public key - 32 bytes
    0xec: 32,

    // ed25519-pub - Ed25519 public key - 32 bytes
    0xed: 32,
  };

  /**
   * A mapping from multicodec names to their corresponding JOSE (JSON Object Signing and Encryption)
   * representations. This mapping facilitates the conversion of multicodec key formats to
   * JWK (JSON Web Key) formats.
   *
   * @remarks
   * The keys of this object are multicodec names, such as 'ed25519-pub', 'ed25519-priv', etc.
   * The values are objects representing the corresponding JWK properties for that key type.
   *
   * @example
   * ```ts
   * const joseKey = MULTICODEC_TO_JWK['ed25519-pub'];
   * // Returns a partial JWK for an Ed25519 public key
   * ```
   */
  private static MULTICODEC_TO_JWK: { [key: string]: Jwk } = {
    'ed25519-pub': { crv: 'Ed25519', kty: 'OKP', x: '' },
    'ed25519-priv': { crv: 'Ed25519', kty: 'OKP', x: '', d: '' },
    'secp256k1-pub': { crv: 'secp256k1', kty: 'EC', x: '', y: '' },
    'secp256k1-priv': { crv: 'secp256k1', kty: 'EC', x: '', y: '', d: '' },
    'x25519-pub': { crv: 'X25519', kty: 'OKP', x: '' },
    'x25519-priv': { crv: 'X25519', kty: 'OKP', x: '', d: '' },
  };

  /**
   * Returns the appropriate public key compressor for the specified cryptographic curve.
   *
   * @param curve - The cryptographic curve to use for the key conversion.
   * @returns A public key compressor for the specified curve.
   */
  public static keyCompressor(curve: string): KeyCompressor['compressPublicKey'] {
    // ): ({ publicKeyBytes }: { publicKeyBytes: Uint8Array }) => Promise<Uint8Array> {
    const compressors = {
      'P-256': Secp256r1.compressPublicKey,
      secp256k1: Secp256k1.compressPublicKey,
    } as Record<string, KeyCompressor['compressPublicKey']>;

    const compressor = compressors[curve];

    if (!compressor) throw new DidError(DidErrorCode.InvalidPublicKeyType, `Unsupported curve: ${curve}`);

    return compressor;
  }

  /**
   * Returns the appropriate key converter for the specified cryptographic curve.
   *
   * @param curve - The cryptographic curve to use for the key conversion.
   * @returns An `AsymmetricKeyConverter` for the specified curve.
   */
  public static keyConverter(curve: string): AsymmetricKeyConverter {
    const converters: Record<string, AsymmetricKeyConverter> = {
      Ed25519: Ed25519,
      'P-256': Secp256r1,
      secp256k1: Secp256k1,
      X25519: X25519,
    };

    const converter = converters[curve];

    if (!converter) throw new DidError(DidErrorCode.InvalidPublicKeyType, `Unsupported curve: ${curve}`);

    return converter;
  }
}
