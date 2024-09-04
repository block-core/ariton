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
      $actions: [{ role: 'collaborator', can: ['create', 'update', 'read', 'delete'] }],
      // $actions: [
      //   {
      //     who: 'anyone',
      //     can: ['create', 'update', 'read'],
      //   },
      // ],
      task: {
        $actions: [
          // {
          //   who: 'anyone',
          //   can: ['create', 'update', 'read'],
          // },
          { role: 'collaborator', can: ['create', 'update', 'read', 'delete'] },
        ],
        // $actions: [
        //   {
        //     who: 'author',
        //     of: 'list',
        //     can: ['create', 'update'],
        //   },
        //   {
        //     who: 'recipient',
        //     of: 'list',
        //     can: ['create', 'update'],
        //   },
        // ],
      },
    },
  },
};
