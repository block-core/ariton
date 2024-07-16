export const protocolDefinition = {
  published: true,
  protocol: 'https://schema.ariton.app/registry/entry',
  types: {
    profile: {
      dataFormats: ['application/json'],
    },
    avatar: {
      dataFormats: ['image/gif', 'image/png', 'image/jpeg'],
    },
    hero: {
      dataFormats: ['image/gif', 'image/png', 'image/jpeg'],
    },
  },
  structure: {
    profile: {},
    avatar: {},
    hero: {},
  },
};
