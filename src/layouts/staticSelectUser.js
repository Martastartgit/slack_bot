module.exports = (actionId) => ({
    type: 'input',
    block_id: 'user_block',
    dispatch_action: true,
    element: {
        type: 'conversations_select',
        placeholder: {
            type: 'plain_text',
            text: 'Select a user',
            emoji: true
        },
        filter: {
            include: ['im'],
            exclude_bot_users: true
        },
        action_id: `${actionId}`
    },
    label: {
        type: 'plain_text',
        text: 'Choose user from the list',
        emoji: true
    }
});
