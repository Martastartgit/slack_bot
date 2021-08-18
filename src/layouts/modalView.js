module.exports = (text, callbackId) => ({
    type: 'modal',
    callback_id: `${callbackId}`,
    title: {
        type: 'plain_text',
        text: `Create ${text}`
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
                text: `${text}`
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
                    text: 'How much rocks'
                }
            },
            label: {
                type: 'plain_text',
                text: 'Rocks'
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
});
