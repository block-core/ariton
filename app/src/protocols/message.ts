export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/message',
  published: true,
  types: {
    message: {
      schema: 'https://schema.ariton.app/message/schema/message',
      dataFormats: ['application/json'],
    },
    writer: {
      schema: 'https://schema.ariton.app/message/schema/writer',
      dataFormats: ['application/json'],
    },
    request: {
      schema: 'https://schema.ariton.app/message/schema/request',
      dataFormats: ['application/json'],
    },
    /** The credential is an inbox for any VC issued from anyone to this user. Some of these will be manually accepted, other's automatically. */
    credential: {
      schema: 'https://schema.ariton.app/message/schema/credential',
      dataFormats: ['application/json'],
    },
    // attachment: {},
  },
  structure: {
    writer: {
      $role: true,
    },
    message: {
      // Owner of the DWN must assign a writer role before any message can be written in their DWN.
      $actions: [
        { role: 'writer', can: ['create', 'update'] },
        { who: 'author', of: 'message', can: ['read'] },
        { who: 'recipient', of: 'message', can: ['read'] },
      ],
      //   attachment: {
      //     $actions: [
      //       {
      //         who: 'anyone',
      //         can: ['create', 'update'],
      //       },
      //     ],
      //   },
    },
    request: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'update', 'delete'],
        },

        // The sender of a friend request can read and delete it.
        { who: 'author', of: 'request', can: ['read', 'create', 'delete'] },

        // The receiver of a friend request can delete it, this will also result in delete in the sender's DWN.
        { who: 'recipient', of: 'request', can: ['read', 'create', 'delete', 'co-delete'] },
      ],
    },
    credential: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'update', 'delete'],
        },

        // The sender of a friend request can read and delete it.
        { who: 'author', of: 'request', can: ['read', 'create', 'delete'] },

        // The receiver of a friend request can delete it, this will also result in delete in the sender's DWN.
        { who: 'recipient', of: 'request', can: ['read', 'create', 'delete', 'co-delete'] },
      ],
    },
  },
};
