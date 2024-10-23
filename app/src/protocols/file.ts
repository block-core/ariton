export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/file',
  published: true,
  types: {
    entry: {
      schema: 'https://schema.ariton.app/file/schema/entry',
    },
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
      $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'query', 'subscribe'] }],
      entry: {
        $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'query', 'subscribe'] }],
        entry: {
          $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'query', 'subscribe'] }],
          entry: {
            $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'query', 'subscribe'] }],
          },
        },
      },
    },
  },
};
