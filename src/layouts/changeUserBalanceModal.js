module.exports = ({
    title: {
        type: 'plain_text',
        text: 'Change Balance'
    },
    submit: {
        type: 'plain_text',
        text: 'Submit'
    },
    callback_id: 'changeBalance_modal',
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
                    text: 'Rocks',
                    emoji: true
                },
                action_id: 'change_input-rocks'
            },
            label: {
                type: 'plain_text',
                text: 'Set new value',
                emoji: true
            }
        }
    ],
    type: 'modal'
});
