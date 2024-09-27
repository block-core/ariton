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
      collaborator: {
        $role: true,
      },
      $actions: [
        { role: 'collaborator', can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update'] },
        { role: 'list/collaborator', can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update'] },
      ],
      task: {
        $actions: [
          {
            role: 'collaborator',
            can: ['create', 'update', 'read', 'delete', 'query', 'subscribe', 'co-update', 'co-delete'],
          },
          { role: 'list/collaborator', can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update'] },
        ],
      },
    },
  },
};
