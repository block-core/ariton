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

### Gated Access

It should be possible for the owner of a community, to make it a gated community that will require the members to provide a Verifiable Credential in order to join the community. The owner of the community can choose which Verifiable Credential is required, by selecting the authority (DID) and the type of credential.

Examples of Verifiable Credentials could be one that proves age, one that proves pre-paid access, one that proves membership in some external source, etc.

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

Apps will also have a protocol that must be installed on the DWN of the user. The will be downloaded and installed automatically when the user clicks on the app. The protocol itself will need to be stored in the owner's DWN, as it won't be part of the approval of the app, but rather the owner's DWN so the app owner can always update their own protocol as needed.

### Proposed Apps

- **Tasks**: A simple task manager that allows shared items, either in read-only mode or collaboration mode.
- **Recipies**: Collect and share food recipies.
- **Calendar**: A simple calendar app that allows shared events.
- **Media Player**: This will integrate into the window frame with media playback controls.
- **Video Chat**: A simple video chat app that allows for group video calls.
- **Marketplace**: A simple marketplace app that allows users to buy and sell goods and services.
- **Data Editor**: A generic data editor that allows users to manage their data.
- **Chat**: A simple chat app that allows for group chat.
- **Forum**: A simple forum app that allows for threaded discussions.
- **Blog**: A simple blog app that allows for blog posts.
- **Game**: Simple games such as Tic-Tac-Toe style games, chess and others could be implemented.
- **Map**: A simple map app that allows for viewing maps, can be used to display locations of interest (guides, hiking trails, etc) or land areas (Terra Registry).

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

## Social Graph

This is a protocol that is used to collect connections with other users. The connections are stored in the user's DWN.

### Use Case Flow

1. User A looks up User B profile, discovered through their DID.
2. User A can only send friend request if the DWN of User B has enabled friend requests (write permission). This check only happens after user takes active decision to "Add Friend". This avoids additional network traffic, but can become annoying for users if most people have disable friend requests.
3. User A sends a friend request to User B. This involves sending a message to User B, that User A wants to connect. This goes to a special inbox that is only for friend requests.
4. At the same time, User A will issue various roles to User B, to allow User B to perform additional actions. These actions are available even if User B never accept the friend request. These roles are stored in User A's DWN. One of those permissions include the ability to send Direct Messages.
5. Maybe User A should be allowed to choose a "role" (or "circle") that User B will be added to. This will allow User A to manage their connections in a more structured way. For example "Family" and "Friends" can be two different circles, and when added to either, a user can see family photos or not.

Friendship VCs:

During the use case above, upon the initial friend request, a Verifiable Credential is issued to User B, that User A wants to connect. This VC is stored in User A's and B's DWN. User B can then choose to accept or reject the friend request. If User B accepts the friend request, a new VC is issued that contains reference, or the actual other VC, that User B has accepted the friend request. This VC is stored in User A's and B's DWN. This allows both to demonstrate that they are friends with each other with a single VC that contains signatures from both.

The `request` type of message should support multiple kinds, including DM requests. That will allow anyone to message anyone,
without first having to be friends. The message request appears not in the regular chat messages to avoid spam.

schema: https://schema.ariton.app/social-graph

```json
{
  "did": "did:web5:0x1234567890abcdef"
}
```

## Message Protocol

The message protocol is a simple protocol that allows users to send messages to each other. The messages are stored in the user's DWN. Should there be a `from` field that allows the user to send a message on behalf of another user?

schema: https://schema.ariton.app/message

```json
{
  "from": "did:web5:0x1234567890abcdef",
  "to": "did:web5:0xabcdef1234567890",
  "message": "Hello, how are you?"
}
```
