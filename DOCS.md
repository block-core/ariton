# Ariton Documentation / Dev Notes

## Communities

Communities are public accessible lists of curated data. A community must be pre-approved by the Ariton team in order to be listed in the Ariton app.

A community can be age-restricted, which will then require anyone to join the community, to provide a Verifiable Credential that proves their age. Ariton is responsible for deciding which authority of
age rating is acceptable. There can be multiple age rating authorities that are accepted by Ariton.

schema: https://schema.ariton.app/community/entry

```json
{
    "name": "Knitting Patterns United",
    "description": "We share knitting patterns and ideas",
    "icon": "https://ariton.app/assets/ariton-favicon.png",
    "owner": "did:web5:0x1234567890abcdef"
}
```

```json
{
    "name": "Gathering of Tribes",
    "description": "Community that connects tribes",
    "icon": "https://ariton.app/assets/ariton-favicon.png",
    "owner": "did:web5:0x1234567890abcdef",
    "requirements": {
        "age": 18
    }
}
```

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

schema: https://schema.ariton.app/registry/config

```json
{
    "layout": "grid",
    "columns": 3,
    "sort": "date"
}
```

Then the app will proceed to query for entries.

schema: https://schema.ariton.app/registry/data

```json
{}
```

## Apps

Apps are public accessible list of mini apps that are curated by the Ariton team.

Communities can host their own custom apps, but the main Apps list is accessible to the public and is curated.

schema: https://schema.ariton.app/app/entry

```json
{
    "name": "Chat",
    "description": "Basic Chat App",
    "icon": "https://ariton.app/assets/ariton-favicon.png",
    "url": "https://apps.ariton.app/chat",
    "owner": "did:web5:0x1234567890abcdef"
}
```

Mini Apps will load dynamically in an iframe and be embedded into Ariton.

Mini Apps are scheduled to be released in a future version of Ariton. Until the architecture for dynamically loading mini apps is in place, the "Apps" section will contain apps that are built-in to Ariton.

## Marketplace

Marketplace is suppose to give an aggregated view over the markets in all the communities that the user is a member of. This description only describes how a single marketplace functions within a community (not the global marketplace).

The idea of the Marketplace, is to allow users within Communities to buy and sell goods and services. The Marketplace is a list of entries that are curated by the community owner. The community owner can choose to charge a fee for listing items in the marketplace.

schema: https://schema.ariton.app/marketplace/entry

```json
{
    "name": "Square",
    "description": "Random items",
    "icon": "sofa"
}
```
