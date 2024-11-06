export const protocolDefinition = {
  published: true,
  protocol: 'https://schema.ariton.app/name',
  types: {
    name: {
      dataFormats: ['application/json'],
    },
    admin: {
      schema: 'https://schema.ariton.app/name/admin',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    name: {
      admin: {
        $role: true,
      },
      $actions: [
        { role: 'name/admin', can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update', 'co-delete'] },
      ],
    },
  },
};
