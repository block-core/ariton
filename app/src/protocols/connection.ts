export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/connections',
  published: true,
  types: {
    request: {
      schema: 'https://schema.ariton.app/connections/schema/request',
      dataFormats: ['application/json'],
    },
    connection: {
      schema: 'https://schema.ariton.app/connections/schema/connection',
      dataFormats: ['application/json'],
    },
    // Used to "block" a user from sending messages to the owner of the DWN.
    // It is not possible to physically block, but we will never show these
    // requests to the user anymore and delete them in the background.
    block: {
      schema: 'https://schema.ariton.app/connect/schema/block',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    block: {},
    connection: {},
    request: {
      $size: {
        // Normal request is about 107 bytes, keep limit so requests won't fail, but protect against large spam.
        // Friend requests with VCs are about 1115 bytes.
        max: 3000,
      },
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'update', 'delete'],
        },
        // The sender of a connection request can read and delete it.
        { who: 'author', of: 'request', can: ['read', 'create', 'delete'] },

        // The receiver of a friend request can delete it, this will also result in delete in the sender's DWN.
        { who: 'recipient', of: 'request', can: ['read', 'create', 'delete', 'co-delete'] },
      ],
    },
  },
};
