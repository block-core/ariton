export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/community/entry',
  published: true,
  types: {
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
  },
  structure: {
    friend: {
      $role: true,
    },
    album: {
      $actions: [
        {
          role: 'friend',
          can: ['create', 'update'],
        },
      ],
      participant: {
        $role: true,
        $actions: [
          {
            who: 'author',
            of: 'album',
            can: ['create', 'update'],
          },
        ],
      },
      updater: {
        $role: true,
        $actions: [
          {
            role: 'album/participant',
            can: ['create', 'update'],
          },
        ],
      },
      photo: {
        $actions: [
          {
            role: 'album/participant',
            can: ['create', 'update'],
          },
          {
            role: 'album/updater',
            can: ['co-update'],
          },
          {
            who: 'author',
            of: 'album',
            can: ['create', 'update'],
          },
        ],
      },
    },
  },
};
