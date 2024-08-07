export const protocolDefinition = {
    protocol: 'http://anyone-collaborate-protocol.xyz',
    published: true,
    types: {
        doc: {},
    },
    structure: {
        doc: {
            $actions: [
                {
                    who: 'anyone',
                    can: ['read', 'co-update', 'co-delete'],
                },
            ],
        },
    },
};
