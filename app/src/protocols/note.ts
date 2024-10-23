export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/note',
  published: true,
  types: {
    note: {
      schema: 'https://schema.ariton.app/note/schema/note',
      dataFormats: ['application/json'],
    },
    collaborator: {
      schema: 'https://schema.ariton.app/note/schema/collaborator',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    collaborator: {
      $role: true,
    },
    note: {
      $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'query', 'subscribe'] }],
    },
  },
};
