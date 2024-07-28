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
          can: ['create', 'update'],
        },
        { who: 'author', of: 'request', can: ['read'] },
        { who: 'recipient', of: 'request', can: ['read'] },
      ],
    },
  },
};
