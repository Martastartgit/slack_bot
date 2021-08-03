module.exports = (user, item, text) => [
    {
        type: "mrkdwn",
        text: `*User name:*\n${user.name} `
    },
    {
        type: "mrkdwn",
        text: `*${text}:*\n${item.value}`
    },
    {
        type: "mrkdwn",
        text: `*Rocks:*\n${item.rocks}`
    }
]
