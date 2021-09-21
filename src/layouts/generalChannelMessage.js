module.exports = (id, chosenAction, rocks) => [
    {
        type: 'header',
        text: {
            type: 'plain_text',
            text: 'Balance notification'
           
        }
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `<@${id}> has received *${chosenAction.rocks}*:moneybag: `,
    
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `For this action:trophy: : *${chosenAction.value}*\nCurrent balance: *${rocks}*:moneybag: `,
        
        }
    }
];
