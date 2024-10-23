export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/data',
  published: true,
  types: {
    data: {
      schema: 'https://schema.ariton.app/data/schema/data',
      dataFormats: ['application/json'],
    },
    // collaborator: {
    //   schema: 'https://schema.ariton.app/note/schema/collaborator',
    //   dataFormats: ['application/json'],
    // },
  },
  structure: {
    // collaborator: {
    //   $role: true,
    // },
    data: {
      // $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'query', 'subscribe'] }],
    },
  },
};
