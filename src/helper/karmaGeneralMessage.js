module.exports = (karmaUser, karmaRocks, user) => [
    {
        type: 'header',
        text: {
            type: 'plain_text',
            text: 'Karma notification'
        }
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `<@${karmaUser.id}> has received *${karmaRocks}* rocks.`
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `From the user: <@${user}>\nCurrent balance: *${karmaUser.rocks}*`
        }
    }
];
