export const protocolDefinition = {
  protocol: 'https://schema.ariton.app/social-graph',
  published: true,
  types: {
    post: {
      schema: 'https://schema.ariton.app/social-graph/postSchema',
      dataFormats: ['text/plain'],
    },
    reply: {
      schema: 'https://schema.ariton.app/social-graph/replySchema',
      dataFormats: ['text/plain'],
    },
    image: {
      dataFormats: ['image/jpeg'],
    },
    caption: {
      schema: 'https://schema.ariton.app/social-graph/captionSchema',
      dataFormats: ['text/plain'],
    },
  },
  structure: {
    post: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'read'],
        },
      ],
      reply: {
        $actions: [
          {
            who: 'recipient',
            of: 'post',
            can: ['create'],
          },
          {
            who: 'author',
            of: 'post',
            can: ['create'],
          },
        ],
      },
    },
    image: {
      $actions: [
        {
          who: 'anyone',
          can: ['create', 'read'],
        },
      ],
      caption: {
        $actions: [
          {
            who: 'anyone',
            can: ['read'],
          },
          {
            who: 'author',
            of: 'image',
            can: ['create'],
          },
        ],
      },
      reply: {
        $actions: [
          {
            who: 'author',
            of: 'image',
            can: ['read'],
          },
          {
            who: 'recipient',
            of: 'image',
            can: ['create'],
          },
        ],
      },
    },
  },
};
