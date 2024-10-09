export const protocolDefinition = {
  published: true,
  protocol: 'https://schema.ariton.app/profile',
  types: {
    profile: {
      schema: 'https://schema.ariton.app/profile/schema/profile',
      dataFormats: ['application/json'],
    },
    // title: {
    //   dataFormats: ['application/json'],
    // },
    bio: {
      dataFormats: ['application/json'],
    },
    status: {
      dataFormats: ['application/json'],
    },
    location: {
      dataFormats: ['application/json'],
    },
    birthDate: {
      dataFormats: ['application/json'],
    },
    social: {
      dataFormats: ['application/json'],
    },
    messaging: {
      dataFormats: ['application/json'],
    },
    phone: {
      dataFormats: ['application/json'],
    },
    address: {
      dataFormats: ['application/json'],
    },
    career: {
      dataFormats: ['application/json'],
    },
    payment: {
      dataFormats: ['application/json'],
    },
    avatar: {
      dataFormats: ['image/gif', 'image/png', 'image/jpeg'],
    },
    hero: {
      dataFormats: ['image/gif', 'image/png', 'image/jpeg'],
    },
  },
  structure: {
    profile: {
      $actions: [
        {
          who: 'anyone',
          can: ['read'],
        },
      ],
    },
    // name: {},
    // title: {},
    bio: {},
    status: {},
    location: {},
    birthDate: {},
    social: {},
    career: {},
    avatar: {
      $actions: [
        {
          who: 'anyone',
          can: ['read'],
        },
      ],
    },
    hero: {
      $actions: [
        {
          who: 'anyone',
          can: ['read'],
        },
      ],
    },
    messaging: {},
    address: {},
    phone: {},
    payment: {},
  },
};
