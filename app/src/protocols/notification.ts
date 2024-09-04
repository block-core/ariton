export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/notification',
  published: true,
  types: {
    event: {
      schema: 'https://schema.ariton.app/notification/schema/event',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    event: {},
  },
};
