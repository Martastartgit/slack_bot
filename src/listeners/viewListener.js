const {
    getInputValue, actionViewHelper, rewardViewHelper, editActionViewHelper
} = require('../helper');
const {
    approvedAttachment,
    karmaHRBlock
} = require('../layouts');
const {
    roxyValidation
} = require('../validators');
const {
    userService,
    karmaService
} = require('../service');
const { constants } = require('../constants');
const { HR2 } = require('../config/config');

module.exports = {
    modalViewAction: async ({
        ack, body, view, client
    }) => {
        const [
            actionInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, rocksValue } = getInputValue(actionInput, roxyInput, constants.ACTION);

        await actionViewHelper(textValue, rocksValue, ack, client, body);
    },

    modalViewReward: async ({
        ack, body, view, client
    }) => {
        const [
            rewardInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, rocksValue } = getInputValue(rewardInput, roxyInput, constants.REWARD);

        await rewardViewHelper(textValue, rocksValue, ack, client, body);
    },

    modalViewKarma: async ({
        ack, body, view, client
    }) => {
        const [
            userInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, rocksValue } = getInputValue(userInput, roxyInput, constants.KARMA);

        const ifRoxyNotValid = roxyValidation(Number(rocksValue));

        if (ifRoxyNotValid) {
            await ack({
                response_action: 'errors',
                errors: {
                    rocks_block: 'Not valid input'
                }
            });

            return;
        }

        const { _id } = await userService.findUser({ id: body.user.id });

        const { rocks } = await karmaService.findUserKarma({ userId: _id });

        if (rocks < rocksValue) {
            await ack({
                response_action: 'errors',
                errors: {
                    rocks_block: 'You don\'t have enough rocks!'
                }
            });

            return;
        }

        if (textValue === body.user.id) {
            await ack({
                response_action: 'errors',
                errors: {
                    user_block: 'You can\'t select yourself. Choose another user!'
                }
            });

            return;
        }

        await ack();

        await client.chat.postMessage({
            channel: body.user.id,
            text: 'Your karma program must be approved by HR. You\'ll receive notification about it!',
        });

        await client.chat.postMessage({
            channel: `${HR2}`,
            text: `${body.user.id},${textValue},${rocksValue}`,
            blocks: karmaHRBlock(body.user.id, rocksValue, textValue),
            attachments: approvedAttachment(constants.KARMA)
        });
    },

    changeBalanceModal: async ({
        ack, body, view, client
    }) => {
        const [
            userInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, rocksValue } = getInputValue(userInput, roxyInput, constants.KARMA);

        const ifRoxyNotValid = roxyValidation(Number(rocksValue));

        if (ifRoxyNotValid) {
            await ack({
                response_action: 'errors',
                errors: {
                    rocks_block: 'Not valid input'
                }
            });

            return;
        }

        await ack();

        await userService.updateOne({ id: textValue }, { $set: { rocks: rocksValue } });

        await client.chat.postMessage({
            channel: body.user.id,
            text: `You changed <@${textValue}> rocks to ${rocksValue}`
        });

        await client.chat.postMessage({
            channel: `${textValue}`,
            text: `<@${body.user.id}> changed your balance\n current balance: ${rocksValue} rocks`,
        });
    },

    editActionView: async ({
        ack, body, view, client
    }) => {
        const [
            actionInput,
            roxyInput
        ] = Object.values(view.state.values);

        const actionId = Object.keys(actionInput);

        const { textValue, rocksValue } = getInputValue(actionInput, roxyInput, constants.ACTION);

        await editActionViewHelper(textValue, rocksValue, ack, client, body, actionId);
    }

};
