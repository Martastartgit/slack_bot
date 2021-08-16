const { constants } = require('../constants');
const { actionService, rewardService } = require('../service');

const createOptions = async (text) => {
    let options;

    switch (text) {
        case constants.ACTION:
            options = await actionService.getAllListOfActions();
            break;
        case constants.REWARD:
            options = await rewardService.getAllRewards();
            break;
    }

    return options.map((item) => ({
        type: 'plain_text',
        text: `${item.value}-${item.rocks} rocks`,
        value: `${item.value}`
    }));
};

module.exports = async (text, callback) => {
    const allOptions = await createOptions(text);

    return [{
        fallback: 'If you could read this message, you’d be choosing something fun to do right now',
        color: '#3AA3E3',
        callback_id: `${callback}`,
        attachment_type: 'default',
        actions: [{
            name: 'list',
            text: 'Select item',
            type: 'select',
            options: allOptions
        }]
    }];
};
