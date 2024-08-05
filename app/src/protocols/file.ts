export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/file',
  published: true,
  types: {
    file: {
      schema: 'https://schema.ariton.app/file/schema/file',
      dataFormats: ['application/json'],
    },
    folder: {
      schema: 'https://schema.ariton.app/file/schema/folder',
      dataFormats: ['application/json'],
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
    file: {
      $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
    },
    folder: {
      $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
    },
  },
};
