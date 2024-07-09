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

## Data

Any user on Ariton will be able to create and store data in the Ariton network. This data can be shared with other users, communities, registries and apps.

The data is stored in a decentralized manner, and can be encrypted. The user can choose to share the data with others, by providing them with a key to decrypt the data.

schema: https://schema.ariton.app/data/entry

```json
{
    "name": "My Data",
    "description": "My data",
    "icon": "https://ariton.app/assets/ariton-favicon.png",
    "owner": "did:web5:0x1234567890abcdef"
}
```

A user must submit their data structure for public listing approval, but the data itself is not stored in the Ariton network. The data is stored in the user's own storage, and the Ariton network only stores the metadata.

A user can always share their data with other users outside or within a community, without any approval by Ariton. Ariton only approves what is listed to the public, not what is available.

### Generic Data Editor

Part of the Data feature of Ariton, will be a generic data editor where users can manage their data. The data can be knitting patterns, videos that have been validated to be acceptable for smaller children, or any other type of data.

### Data Subscriptions

Users can subscribe to data, and be notified when the data is updated. This can be useful for example when a new knitting pattern is added to a community, or when a new video is added to a children's video collection.

The subscriptions can also be based upon payments to the owner of the data.
