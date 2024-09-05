export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/task',
  published: true,
  types: {
    list: {
      schema: 'https://schema.ariton.app/task/list',
      dataFormats: ['application/json'],
    },
    task: {
      schema: 'https://schema.ariton.app/task/task',
      dataFormats: ['application/json'],
    },
    collaborator: {
      schema: 'https://schema.ariton.app/task/collaborator',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    collaborator: {
      $role: true,
    },
    list: {
      $actions: [{ role: 'collaborator', can: ['read'] }],
      task: {
        $actions: [
          // Allow the collaborator to do anything with the items within the list, but not delete/edit entire list.
          { role: 'collaborator', can: ['create', 'update', 'read', 'delete', 'co-update', 'co-delete'] },
        ],
      },
    },
  },
};
