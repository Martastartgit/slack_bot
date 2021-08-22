const {
    roxyValidation,
    textInputValidation
} = require('../validators');
const {
    rewardService
} = require('../service');

module.exports = async (item, rocks, ack, client, body) => {
    const ifRoxyNotValid = roxyValidation(Number(rocks));
    const ifTextValid = textInputValidation(item);

    if (ifRoxyNotValid) {
        await ack({
            response_action: 'errors',
            errors: {
                roxy_block: 'Not valid input'
            }
        });

        return;
    }

    if (!ifTextValid) {
        await ack({
            response_action: 'errors',
            errors: {
                action_block: 'Not valid input'
            }
        });

        return;
    }

    await ack();

    await rewardService.createReward({ value: item, rocks: Number(rocks) });

    await client.chat.postMessage({
        channel: body.user.id,
        text: 'Reward was created'
    });
};
