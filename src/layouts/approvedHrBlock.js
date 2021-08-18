const blockFields = require('./blockFields');

module.exports = (user, item, text) => [
    {
        type: 'section',
        text: {
            text: `<@${user.id}> request an action`,
            type: 'mrkdwn'
        }
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        fields: blockFields(user, item, text)
    }
];
