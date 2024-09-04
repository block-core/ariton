export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/chat',
  published: true,
  types: {
    // thread: {
    //   schema: 'thread',
    //   dataFormats: ['application/json'],
    // },
    message: {
      schema: 'https://schema.ariton.app/chat/message',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    message: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'update'],
        },
        {
          who: 'author',
          of: 'message',
          can: ['read'],
        },
        {
          who: 'recipient',
          of: 'message',
          can: ['read'],
        },
      ],
    },
  },
};
