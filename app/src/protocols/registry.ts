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
    admin: {
      schema: 'https://schema.ariton.app/name/admin',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    admin: {
      $role: true,
    },
    profile: {
      // admin: {
      //   $role: true,
      // },
      $actions: [{ role: 'admin', can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update', 'co-delete'] }],
    },
    avatar: {},
    hero: {},
  },
};
