export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/connections',
  published: true,
  types: {
    request: {
      schema: 'https://schema.ariton.app/connections/schema/request',
      dataFormats: ['application/json'],
    },
    connections: {
      schema: 'https://schema.ariton.app/connections/schema/connections',
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
    connections: {},
    request: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'update', 'delete'],
        },
      ],
    },
  },
};
