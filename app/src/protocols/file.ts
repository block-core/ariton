export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/file',
  published: true,
  types: {
    entry: {
      schema: 'https://schema.ariton.app/file/schema/entry',
    },
    // root: {
    //   schema: 'https://schema.ariton.app/file/schema/entry',
    //   dataFormats: ['application/json'],
    // },
    // parent: {
    //   schema: 'https://schema.ariton.app/file/schema/entry',
    //   dataFormats: ['application/json'],
    // },
    // child: {
    //   schema: 'https://schema.ariton.app/file/schema/entry',
    //   dataFormats: ['application/json'],
    // },
    // attachment: {
    //   schema: 'https://schema.ariton.app/file/schema/attachment',
    // },
    collaborator: {
      schema: 'https://schema.ariton.app/file/schema/collaborator',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    collaborator: {
      $role: true,
    },
    entry: {
      $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
      entry: {
        $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
        entry: {
          $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
          entry: {
            $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
          },
        },
      },
    },
    // attachment: {
    //   $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
    // },
    // folder: {
    //   $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
    // },
  },
};
