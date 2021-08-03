module.exports = [{
    type: "section",
    text: {
        type: "mrkdwn",
        text: "This is a list of all commands"
    },
    accessory: {
        type: "static_select",
        placeholder: {
            type: "plain_text",
            text: "Command",
            emoji: true
        },
        options: [
            {
                text: {
                    type: "plain_text",
                    text: "/get_actions"
                },
                value: "/get_actions"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/add_action"
                },
                value: "/add_action"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/add_reward"
                },
                value: "add_reward"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/get_rewards"
                },
                value: "get_rewards"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/balance"
                },
                value: "balance"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/karma"
                },
                value: "karma"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/return_reward"
                },
                value: "return_reward"
            }
        ],
        action_id: "static_select-command"
    }
}]
