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
  },
  structure: {
    list: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'update', 'read'],
        },
      ],
      task: {
        $actions: [
          {
            who: 'anyone',
            can: ['create', 'update', 'read'],
          },
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
