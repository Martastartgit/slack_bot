const {
    roxyValidation,
    textInputValidation
} = require('../validators');
const {
    actionService
} = require('../service');

module.exports = async (item, rocksValue, ack, client, body, id) => {
    const ifRoxyNotValid = roxyValidation(Number(rocksValue));
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

    await actionService.updateAction({ _id: id }, { $set: { rocks: rocksValue, value: item } });

    await client.chat.postMessage({
        channel: body.user.id,
        text: `This action: ${item} was edited`
    });
};
