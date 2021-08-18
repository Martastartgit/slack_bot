const createOptions = (options) => options.map((item) => ({
    type: 'plain_text',
    text: `${item.value}`,
    value: `${item.value}`,
    emoji: true
}));

module.exports = (rewards) => {
    const rewardOptions = createOptions(rewards);
    return [{
        fallback: 'If you could read this message, you’d be choosing something fun to do right now',
        color: '#3AA3E3',
        callback_id: 'static_select-reward',
        attachment_type: 'default',
        actions: [{
            name: 'list',
            text: 'Select item',
            type: 'select',
            options: rewardOptions
        }]
    }];
};
