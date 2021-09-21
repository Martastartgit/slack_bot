const {
    balanceValueInput, getInputValue, actionViewHelper, rewardViewHelper, editActionViewHelper, editRewardViewHelper
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
const { HR3 } = require('../config/config');

module.exports = {
    modalViewAction: async ({
        ack, body, view, client
    }) => {

        const [
            actionInput,
            shortTextInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, rocksValue, shortValue } = getInputValue(actionInput, shortTextInput, roxyInput, constants.ACTION);

        await actionViewHelper(textValue, shortValue, rocksValue, ack, client, body);
    },

    modalViewReward: async ({
        ack, body, view, client
    }) => {
        const [
            rewardInput,
            shortTextInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, rocksValue, shortValue } = getInputValue(rewardInput, shortTextInput, roxyInput, constants.REWARD);

        await rewardViewHelper(textValue, shortValue, rocksValue, ack, client, body);
    },

    modalViewKarma: async ({
        ack, body, view, client
    }) => {
        const [
            userInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { user, rocksValue } = balanceValueInput(userInput, roxyInput);

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

        if (user === body.user.id) {
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
            channel: `${HR3}`,
            text: `${body.user.id},${user},${rocksValue}`,
            blocks: karmaHRBlock(body.user.id, rocksValue, user),
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

        const { user, rocksValue } = balanceValueInput(userInput, roxyInput);

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

        await userService.updateOne({ id: user }, { $set: { rocks: rocksValue } });

        await client.chat.postMessage({
            channel: body.user.id,
            text: `You changed <@${user}> rocks to ${rocksValue}`
        });

        await client.chat.postMessage({
            channel: `${user}`,
            text: `<@${body.user.id}> changed your balance\n current balance: ${rocksValue} rocks`,
        });
    },

    editActionView: async ({
        ack, body, view, client
    }) => {
        const [
            actionInput,
            shortInput,
            roxyInput
        ] = Object.values(view.state.values);

        const actionId = Object.keys(actionInput);

        const { textValue, rocksValue, shortValue } = getInputValue(actionInput, shortInput, roxyInput, constants.ACTION);

        await editActionViewHelper(textValue, shortValue, rocksValue, ack, client, body, actionId);
    },

    editRewardView: async ({
        ack, body, view, client
    }) => {
        const [
            actionInput,
            shortInput,
            roxyInput
        ] = Object.values(view.state.values);

        const actionId = Object.keys(actionInput);

        const { textValue, rocksValue, shortValue } = getInputValue(actionInput, shortInput, roxyInput, constants.ACTION);

        await editRewardViewHelper(textValue, shortValue, rocksValue, ack, client, body, actionId);
    }

};
