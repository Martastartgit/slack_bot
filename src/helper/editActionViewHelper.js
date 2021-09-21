const {
    checkTextLength,
    roxyValidation,
    textInputValidation
} = require('../validators');
const {
    actionService
} = require('../service');

module.exports = async (item, shortText, rocksValue, ack, client, body, id) => {
    const ifRoxyNotValid = roxyValidation(Number(rocksValue));
    const ifTextValid = textInputValidation(item);
    const textLength = checkTextLength(shortText);

    if (ifRoxyNotValid) {
        await ack({
            response_action: 'errors',
            errors: {
                roxy_block: 'Not valid input'
            }
        });

        return;
    }

    if (textLength > 25) {
        await ack({
            response_action: 'errors',
            errors: {
               shortAction_input: 'Text too long'
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

    await actionService.updateAction({ _id: id }, { $set: { rocks: rocksValue, value: item, shortDescription: shortText } });

    await client.chat.postMessage({
        channel: body.user.id,
        text: `This action: ${shortText} was edited`
    });
};
