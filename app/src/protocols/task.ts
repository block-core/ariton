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
    // collaborator: {
    //   $role: true,
    // },
    list: {
      collaborator: {
        $role: true,
      },
      $actions: [
        // Allows the owner of the list to delete it on remote DWNs.
        // What about Tasks? Must be investigated.
        // {
        //   who: 'author',
        //   of: 'list',
        //   can: ['delete'],
        // },
        // { role: 'collaborator', can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update'] },
        { role: 'list/collaborator', can: ['read', 'query', 'subscribe'] },
      ],
      task: {
        $actions: [
          // {
          //   role: 'collaborator',
          //   can: ['create', 'update', 'read', 'delete', 'query', 'subscribe', 'co-update', 'co-delete'],
          // },
          {
            role: 'list/collaborator',
            can: ['create', 'read', 'update', 'query', 'subscribe', 'co-update', 'co-delete'],
          },
        ],
      },
    },
  },
};
