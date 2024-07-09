# Ariton Documentation / Dev Notes

## Registries

Registries are public accessible lists of curated data that is made available by individual DIDs.

Any registry to be listed in Ariton, needs to pay a fee in order to be listed. This fee is used to maintain the Ariton infrastructure.

The Ariton team reserves the right to censor and exclude any registry that is deemed to be harmful or inappropriate.

Registries that change content after initial approval, will be subject to review and may be removed from the Ariton registries.

schema: https://schema.ariton.app/registry/entry

Examples:

```json
{
    "name": "Blockchain Social Network (BSN)",
    "description": "Stellar blockchain data registry",
    "url": "https://ariton.app",
    "icon": "https://ariton.app/assets/ariton-favicon.png",
    "owner": "did:web5:0x1234567890abcdef"
}
```

```json
{
    "name": "Terra Registry",
    "description": "Registry of free territories",
    "url": "https://terrareg",
    "icon": "https://ariton.app/assets/ariton-favicon.png",
    "owner": "did:web5:0x1234567890abcdef"
}
```

### Registry Lookup

When a user chooses a registry, Ariton will retrieve the DWNs from the DID Document connected to the owner of the registry. It will then proceed to read a configuration document that will determine layout and functionality of the registry.

schema: https://schema.ariton.app/registry/configuration

```json
{
    "layout": "grid",
    "columns": 3,
    "sort": "date"
}
```
