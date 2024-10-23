export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/text',
  published: true,
  types: {
    entry: {
      schema: 'https://schema.ariton.app/text/schema/entry',
      dataFormats: ['application/json'],
    },
    collaborator: {
      schema: 'https://schema.ariton.app/text/schema/collaborator',
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
