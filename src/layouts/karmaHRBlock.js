module.exports = (id, rocks, karmaUser) => [
    {
        type: 'section',
        text: {
            text: `<@${id}> request karma program`,
            type: 'mrkdwn'
        }
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        fields: [
            {
                type: 'mrkdwn',
                text: `*What user'll receive:*\n<@${karmaUser}> `
            },
            {
                type: 'mrkdwn',
                text: `*How many rocks:*\n${rocks}`
            }
        ]
    }
];
