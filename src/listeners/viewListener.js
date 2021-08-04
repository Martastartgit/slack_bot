const { getInputValue } = require('../helper');
const { roxyValidation, textInputValidation } = require('../middleware');
const { actionService, rewardService } = require('../service');

module.exports = {
    modalViewAction: async ({
        ack, body, view, client
    }) => {
        const [
            actionInput,
            roxyInput
        ] = Object.values(view.state.values);

        const { textValue, roxyValue } = getInputValue(actionInput, roxyInput);

        const ifRoxyNotValid = roxyValidation(Number(roxyValue));
        const ifTextValid = textInputValidation(textValue);

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

        await actionService.createAction({ value: textValue, rocks: Number(roxyValue) });

        await client.chat.postMessage({
            channel: body.user.id,
            text: 'Action create'
        });
    },

    modalViewReward: async ({
        ack, body, view, client
    }) => {
        const [
            actionInput,
            roxyInput
        ] = Object.values(view.state.values);
        const { textValue, roxyValue } = getInputValue(actionInput, roxyInput);

        const ifRoxyNotValid = roxyValidation(Number(roxyValue));
        const ifTextValid = textInputValidation(textValue);

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

        await rewardService.createReward({ value: textValue, rocks: Number(roxyValue) });

        await client.chat.postMessage({
            channel: body.user.id,
            text: 'Reward create'
        });
    }
};
