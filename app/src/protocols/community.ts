export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/community/entry',
  published: true,
  types: {
    community: {
      schema: 'https://schema.ariton.app/community/schema/community',
      dataFormats: ['application/json'],
    },
    album: {
      schema: 'https://schema.ariton.app/community/schema/album',
      dataFormats: ['text/plain'],
    },
    photo: {
      schema: 'https://schema.ariton.app/community/schema/photo',
      dataFormats: ['text/plain'],
    },
    friend: {
      schema: 'https://schema.ariton.app/community/schema/friend',
      dataFormats: ['text/plain'],
    },
    participant: {
      schema: 'https://schema.ariton.app/community/schema/participant',
      dataFormats: ['text/plain'],
    },
    updater: {
      schema: 'https://schema.ariton.app/community/schema/updater',
      dataFormats: ['text/plain'],
    },
    globalAdmin: {
      schema: 'https://schema.ariton.app/community/schema/globalAdmin',
      dataFormats: ['application/json'],
    },
    admin: {
      schema: 'https://schema.ariton.app/community/schema/admin',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    globalAdmin: {
      $role: true,
    },
    friend: {
      $role: true,
    },
    community: {
      $actions: [
        {
          role: 'globalAdmin',
          can: ['create', 'update'],

          //can: ['create', 'read', 'update', 'delete', 'prune', 'co-prune', 'co-delete', 'co-update'],
        },
      ],

      admin: {
        $role: true,
        $actions: [
          {
            role: 'globalAdmin',
            can: ['create', 'update'],

            //can: ['create', 'read', 'update', 'delete', 'prune', 'co-prune', 'co-delete', 'co-update'],
          },
        ],
      },
      // member: {
      //   $role: true,
      //   $actions: [
      //     {
      //       who: 'author',
      //       of: 'community',
      //       can: ['create', 'read', 'update', 'delete', 'prune'],
      //     },
      //     {
      //       role: 'community/admin',
      //       can: ['create', 'read', 'update', 'delete', 'prune'],
      //     },
      //   ],
      // },
      // $actions: [
      //   {
      //     who: 'author',
      //     of: 'community',
      //     can: ['update', 'delete', 'read', 'prune'],
      //   },
      //   {
      //     role: 'community/admin',
      //     can: ['update', 'read'],
      //   },
      //   {
      //     role: 'community/member',
      //     can: ['read'],
      //   },
      //   {
      //     role: 'admin',
      //     can: ['create', 'read', 'update', 'delete', 'prune', 'co-prune', 'co-delete', 'co-update'],
      //   },
      // ],
    },
    // album: {
    //   $actions: [
    //     {
    //       role: 'friend',
    //       can: ['create', 'update'],
    //     },
    //   ],
    //   participant: {
    //     $role: true,
    //     $actions: [
    //       {
    //         who: 'author',
    //         of: 'album',
    //         can: ['create', 'update'],
    //       },
    //     ],
    //   },
    //   updater: {
    //     $role: true,
    //     $actions: [
    //       {
    //         role: 'album/participant',
    //         can: ['create', 'update'],
    //       },
    //     ],
    //   },
    //   photo: {
    //     $actions: [
    //       {
    //         role: 'album/participant',
    //         can: ['create', 'update'],
    //       },
    //       {
    //         role: 'album/updater',
    //         can: ['co-update'],
    //       },
    //       {
    //         who: 'author',
    //         of: 'album',
    //         can: ['create', 'update'],
    //       },
    //     ],
    //   },
    // },
  },
};
