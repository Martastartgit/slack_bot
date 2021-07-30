module.exports = [{
    // type: "section",
    // block_id: "section 890",
    // text: {
    //     type: "mrkdwn",
    //     text: "This is a list of all commands"
    // },
    // accessory: {
    //     type: "overflow",
    //     options: [
    //         {
    //             text: {
    //                 type: "plain_text",
    //                 text: "/get_actions"
    //             },
    //             value: "/get_actions"
    //         },
    //         {
    //             text: {
    //                 type: "plain_text",
    //                 text: "/add_action"
    //             },
    //             value: "/add_action"
    //         },
    //         {
    //             text: {
    //                 type: "plain_text",
    //                 text: "/add_reward"
    //             },
    //             value: "add_reward"
    //         },
    //         {
    //             text: {
    //                 type: "plain_text",
    //                 text: "/get_rewards"
    //             },
    //             value: "get_rewards"
    //         },
    //         {
    //             text: {
    //                 type: "plain_text",
    //                 text: "/balance"
    //             },
    //             value: "balance"
    //         },
    //         {
    //             text: {
    //                 type: "plain_text",
    //                 text: "/karma"
    //             },
    //             value: "karma"
    //         }
    //     ],
    //     action_id: "overflow"
    // }

    type: "section",
    block_id: "section 890",
    text: {
        type: "mrkdwn",
        text: "This is a list of all commands"
    },
    accessory: {
        type: "overflow",
        options: [
            {
                text: {
                    type: "plain_text",
                    text: "/add_action"
                },
                value: "value-0"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/add_reward"
                },
                value: "value-1"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/get_actions"
                },
                value: "value-2"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/get_rewards"
                },
                value: "value-3"
            },
            {
                text: {
                    type: "plain_text",
                    text: "/balance"
                },
                value: "value-4"
            }


        ],
        action_id: "overflow"
    }

}]
