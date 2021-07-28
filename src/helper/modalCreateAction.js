module.exports = {
    type: 'modal',
    callback_id: 'view_1',
    title: {
        type: 'plain_text',
        text: 'Create action'
    },
    blocks: [
        {
            type: 'input',
            block_id: 'action_block',
            element: {
                type: 'plain_text_input',
                action_id: 'action_input',
                multiline: true,
                placeholder: {
                    type: 'plain_text',
                    text: 'Description'
                }
            },
            label: {
                type: 'plain_text',
                text: 'Action'
            }
        },
        {
            type: 'input',
            block_id: 'roxy_block',
            element: {
                type: 'plain_text_input',
                action_id: 'roxy_input',
                placeholder: {
                    type: 'plain_text',
                    text: 'How much roxy'
                }
            },
            label: {
                type: 'plain_text',
                text: 'Roxy'
            }
        }

    ],
    submit: {
        type: 'plain_text',
        text: 'Create'
    },
    close: {
        type: 'plain_text',
        text: 'Cancel'
    }
}
