const createOptions = (options) => options.map((item) => ({
    text: {
        type: 'plain_text',
        text: `${item.value}`,
        emoji: true
    },
    value: `${item.value}`
}));

module.exports = (rewards) => {
    const rewardOptions = createOptions(rewards);
    return [{
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: 'Pick what reward do you want to return'
        },
        accessory: {
            type: 'static_select',
            placeholder: {
                type: 'plain_text',
                text: 'Select a reward',
                emoji: true
            },
            options: rewardOptions,
            action_id: 'static_select-reward'
        }
    }];
};
