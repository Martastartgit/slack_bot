const {
    constants, messages
} = require('../constants');
const { CHANNEL_GENERAL_ID, HR2 } = require('../config/config');
const {
    approvedAttachment,
    approvedHRBlock,
    approvedHRreturn,
    selectMenu,
    filteredStore,
    getValueFromApprovedHrBlock,
    generalChannelMessage,
    selectReturnReward
} = require('../helper');
const { checkUserRocks } = require('../middleware');
const { actionService, userService, rewardService } = require('../service');

module.exports = {
    appMentionAction: async ({ action, ack, say }) => {
        await ack();

        switch (action.value) {
            case constants.REWARD: {
                const selectAttachments = await selectMenu(constants.REWARD, 'select_store');

                await say({
                    text: 'Hey pick reward',
                    attachments: selectAttachments
                });
                break;
            }
            case constants.ACTION:
                const selectAttachments = await selectMenu(constants.ACTION, 'select_action');

                await say({
                    text: 'Hey pick action',
                    attachments: selectAttachments
                });

                break;
        }
    },

    selectAction: async ({ action, ack, say }) => {
        await ack();

        const { selected_options } = action;

        const selectValue = selected_options.map(({ value }) => value);

        const { rocks } = await actionService.findAction({ value: selectValue });

        await say({
            text: `${selectValue}. You get ${rocks} rocks`,
            attachments: approvedAttachment(constants.ACTION, messages.APPROVED)
        });
    },

    selectStore: async ({ action, ack, say }) => {
        await ack();

        const { selected_options } = action;

        const selectValue = selected_options.map(({ value }) => value);

        const { rocks } = await rewardService.findOneReward({ value: selectValue });

        await say({
            text: `${selectValue}. It costs ${rocks} rocks`,
            attachments: approvedAttachment(constants.REWARD, messages.APPROVED)
        });
    },

    selectRewardReturn: async ({
        action, ack, body, say, client
    }) => {
        await ack();

        const rewardName = action.selected_option.value;

        await say(`You selected ${rewardName}\nYour return must be approved by HR.You'll receive a notification`);

        const reward = await rewardService.findOneReward({ value: rewardName });

        await client.chat.postMessage({
            channel: `${HR2}`,
            blocks: approvedHRreturn(body.user, reward, constants.REWARD),
            attachments: approvedAttachment(constants.APPROVED_HR_Return, messages.APPROVED)
        });
    },

    approvedActionByUser: async ({
        action, ack, body, say, client, respond
    }) => {
        await ack();
        switch (action.value) {
            case constants.YES:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: `<@${body.user.id}> approved action` }],
                    replace_original: true
                });

                await say('Your action must be approved by HR. You\'ll receive a notification about it');

                const actionName = body.original_message.text.split('.').shift();

                const chosenAction = await actionService.findAction({ value: actionName });

                await client.chat.postMessage({
                    channel: `${HR2}`,
                    blocks: approvedHRBlock(body.user, chosenAction, constants.ACTION),
                    attachments: approvedAttachment(constants.APPROVED_HR_ACTION, messages.APPROVED)
                });

                break;

            case constants.NO:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: `<@${body.user.id}> reject action` }],
                    replace_original: true
                });

                await say('You can choose another action');

                break;
        }
    },

    approvedRewardByUser: async ({
        action, ack, body, say, client, respond
    }) => {
        await ack();
        switch (action.value) {
            case constants.YES:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: `<@${body.user.id}> approved reward` }],
                    replace_original: true
                });

                const rewardName = body.original_message.text.split('.').shift();

                const [
                    reward,
                    ifEnoughRocks
                ] = await checkUserRocks(rewardName, body.user.id);

                if (!ifEnoughRocks) {
                    await say(`Sorry, <@${body.user.id}> don't have enough rocks for this reward`);

                    return;
                }

                const { rocks } = await userService.updateOne({ id: body.user.id }, {
                    $push: { rewards: reward },
                    $inc: { rocks: -reward.rocks }
                });

                await client.chat.postMessage({
                    channel: `${body.user.id}`,
                    text: `You chose this reward: ${rewardName} from the store\nyour current balance: ${rocks}`

                });

                break;

            case constants.NO:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: `<@${body.user.id}> reject reward` }],
                    replace_original: true
                });

                break;
        }
    },

    approvedActionByHR: async ({
        action, ack, body, respond, client
    }) => {
        await ack();

        const block = body.original_message.blocks;

        const [
            userValue,
            actionValue
        ] = getValueFromApprovedHrBlock(block);

        const { id } = await userService.findUser({ name: userValue });

        switch (action.value) {
            case constants.YES:

                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> approved request` }],
                    replace_original: true
                });

                const chosenAction = await actionService.findAction({ value: actionValue });

                const { rocks } = await userService.updateOne({ name: userValue }, {
                    $push: { actions: chosenAction },
                    $inc: { rocks: +chosenAction.rocks }
                });

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: 'Your action was approved by HR!',
                });

                await client.chat.postMessage({
                    channel: `${CHANNEL_GENERAL_ID}`,
                    blocks: generalChannelMessage(id, chosenAction, rocks)
                });

                break;

            case constants.NO:
                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> reject request` }],
                    replace_original: true
                });

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: `Your request was not approved. Please, contact with <@${body.user.id}> for more details`,
                });

                break;
        }
    },

    approvedReturnReward: async ({
        action, ack, body, say, respond
    }) => {
        await ack();
        switch (action.value) {
            case constants.YES:
                await respond({
                    text: `<@${body.user.id}> approved return`,
                    replace_original: true
                });

                const userRewards = await userService.findUserRewards({ id: body.user.id });

                if (!userRewards.length) {
                    await say('You haven\'t got any rewards yet');

                    return;
                }

                await say({
                    blocks: selectReturnReward(userRewards)
                });

                break;

            case constants.NO:
                await respond({
                    text: `<@${body.user.id}> reject return`,
                    replace_original: true
                });

                break;
        }
    },

    approvedReturnByHR: async ({
        action, ack, body, respond, client
    }) => {
        await ack();

        const block = body.original_message.blocks;

        const [
            userValue,
            actionValue
        ] = getValueFromApprovedHrBlock(block);

        const { id } = await userService.findUser({ name: userValue });

        switch (action.value) {
            case constants.YES:

                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> approved return` }],
                    replace_original: true
                });

                const [
                    reward,
                    rocks
                ] = await filteredStore(userValue, actionValue);

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: `HR approved your return action: ${reward.value}\nCurrent balance: ${rocks}`,
                });

                break;

            case constants.NO:
                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> reject return` }],
                    replace_original: true
                });

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: `Your return was not approved. Please, contact with <@${body.user.id}> for more details`,
                });

                break;
        }
    },

};
