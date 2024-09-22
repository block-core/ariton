export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/post',
  published: true,
  types: {
    post: {
      schema: 'https://schema.ariton.app/post/schema/post',
      dataFormats: ['application/json'],
    },
    // collaborator: {
    //   schema: 'https://schema.ariton.app/post/schema/collaborator',
    //   dataFormats: ['application/json'],
    // },
  },
  structure: {
    // collaborator: {
    //   $role: true,
    // },
    post: {
      // $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
    },
  },
};
