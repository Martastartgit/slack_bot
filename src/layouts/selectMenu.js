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
        text: {
            type: 'plain_text',
            text: `${item.shortDescription} - ${item.rocks} rocks`,
            emoji: true
        },
        value: `${item.shortDescription}`
    }));
};

module.exports = async (text, callback) => {
    const allOptions = await createOptions(text);

    return [{
        type: 'input',
        dispatch_action: true,
        element: {
            type: 'static_select',
            placeholder: {
                type: 'plain_text',
                text: `Select a ${text}`,
                emoji: true
            },
            options: allOptions,
            action_id: `${callback}`
        },
        label: {
            type: 'plain_text',
            text: `This is a list of all ${text}s.`,
            emoji: true
        }
    }];
};
