export const protocolDefinition = {
  protocol: 'https://vc-to-dwn.tbddev.org/vc-protocol',
  published: true,
  types: {
    credential: {
      schema: 'https://vc-to-dwn.tbddev.org/vc-protocol/schema/credential',
      dataFormats: ['application/vc+jwt'],
    },
    issuer: {
      schema: 'https://vc-to-dwn.tbddev.org/vc-protocol/schema/issuer',
      dataFormats: ['text/plain'],
    },
    judge: {
      schema: 'https://vc-to-dwn.tbddev.org/vc-protocol/schema/judge',
      dataFormats: ['text/plain'],
    },
  },
  structure: {
    issuer: {
      $role: true,
    },
    judge: {
      $role: true,
    },
    credential: {
      $actions: [
        {
          role: 'issuer',
          can: ['create'],
        },
        {
          role: 'judge',
          can: ['query', 'read'],
        },
      ],
    },
  },
};
