module.exports = (user, actionName, rocks) => [
    {
        type: "section",
        text: {
            text: `<@${user.id}> request an action`,
            type: "mrkdwn"
        }
    },
    {
        type: "divider"
    },
    {
        type: "section",
        fields: [
            {
                type: "mrkdwn",
                text: `*User name:*\n${user.name} `
            },
            {
                type: "mrkdwn",
                text: `*Action:*\n${actionName}`
            },
            {
                type: "mrkdwn",
                text: `*Rocks:*\n${rocks}`
            }
        ]


    }
]
