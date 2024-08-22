export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/connection',
  published: true,
  types: {
    request: {
      schema: 'https://schema.ariton.app/connection/schema/request',
      dataFormats: ['application/json'],
    },
    // Used to "block" a user from sending messages to the owner of the DWN.
    // It is not possible to physically block, but we will never show these
    // requests to the user anymore and delete them in the background.
    block: {
      schema: 'https://schema.ariton.app/connection/schema/block',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    block: {},
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
