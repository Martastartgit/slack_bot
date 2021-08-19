module.exports = (text, callbackId, item) => ({
    type: 'modal',
    callback_id: `${callbackId}`,
    title: {
        type: 'plain_text',
        text: `Edit ${text}`
    },
    blocks: [
        {
            type: 'input',
            block_id: 'action_block',
            element: {
                type: 'plain_text_input',
                action_id: `${item._id}`,
                multiline: true,
                initial_value: `${item.value}`
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
                initial_value: `${item.rocks}`
            },
            label: {
                type: 'plain_text',
                text: 'Rocks'
            }
        }

    ],
    submit: {
        type: 'plain_text',
        text: 'Edit'
    },
    close: {
        type: 'plain_text',
        text: 'Cancel'
    }
});
