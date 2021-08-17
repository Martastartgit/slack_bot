module.exports = (rocks) => ({
    title: {
        type: 'plain_text',
        text: 'Karma Modal'
    },
    submit: {
        type: 'plain_text',
        text: 'Submit'
    },
    callback_id: 'karma_modal',
    blocks: [
        {
            type: 'input',
            block_id: 'user_block',
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
                action_id: 'karma_user-select'
            },
            label: {
                type: 'plain_text',
                text: 'Choose user from the list',
                emoji: true
            }
        },
        {
            type: 'input',
            block_id: 'rocks_block',
            element: {
                type: 'plain_text_input',
                placeholder: {
                    type: 'plain_text',
                    text: 'You can give only from 1 to 20 rocks!',
                    emoji: true
                },
                action_id: 'karma_input-rocks'
            },
            label: {
                type: 'plain_text',
                text: `You have ${rocks} rocks for karma.How much rocks do you want to give?`,
                emoji: true
            }
        }
    ],
    type: 'modal'
});
