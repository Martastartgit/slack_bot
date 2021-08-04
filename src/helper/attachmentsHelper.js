module.exports = [{
    text: 'Choose what you want to do',
    fallback: 'You are unable to choose',
    color: '#3AA3E3',
    callback_id: 'actions_bot',
    attachment_type: 'default',
    actions: [
        {
            name: 'bot',
            text: 'Rewards',
            type: 'button',
            value: 'Reward'
        },
        {
            name: 'bot',
            text: 'Actions',
            type: 'button',
            value: 'Action'
        }

    ]
}];
