module.exports = {
    type: 'home',
    callback_id: 'home_view',
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "*Welcome to bonusBot Home* :tada:"
            }
        },
        {
            type: "divider"
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Using this bot, you can get rocks, making different actions." +
                    "Then you can exchange these rocks for rewards at the store "
            }
        }

    ]
}
