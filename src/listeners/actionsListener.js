const { constants } = require('../constants');
const {
    CHANNEL_GENERAL_ID,
    HR2
} = require('../config/config');
const {
    changeBalanceHelper,
    checkUserRocks,
    createActionHelper,
    createRewardHelper,
    filteredStore,
    getUserBalanceHelper,
    getValueFromApprovedHrBlock,
    karmaListenerHelper,
    karmaProgramHelper,
    returnRewardHelper
} = require('../helper');
const {
    approvedAttachment,
    approvedHRBlock,
    approvedHRreturn,
    generalChannelMessage,
    editActionModal,
    karmaGeneralMessage,
    selectMenu,
} = require('../layouts');
const {
    actionService,
    userService,
    rewardService
} = require('../service');

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

    selectAction: async ({ action, ack, respond }) => {
        await ack();

        const selectValue = action.selected_option.value;

        const { rocks } = await actionService.findAction({ value: selectValue });

        await respond({
            text: `${selectValue}. You'll get ${rocks} rocks.`,
            attachments: approvedAttachment(constants.ACTION)
        });
    },

    selectStore: async ({ action, ack, respond }) => {
        await ack();

        const selectValue = action.selected_option.value;

        const { rocks } = await rewardService.findOneReward({ value: selectValue });

        await respond({
            text: `${selectValue}. It costs ${rocks} rocks.`,
            attachments: approvedAttachment(constants.REWARD)
        });
    },

    selectRewardReturn: async ({
        action, ack, body, respond, client
    }) => {
        await ack();

        const rewardName = action.selected_options.map(({ value }) => value);

        await respond(`You selected: ${rewardName} \nYour return must be approved by HR. You'll receive a notification.`);

        const reward = await rewardService.findOneReward({ value: rewardName });

        await client.chat.postMessage({
            channel: `${HR2}`,
            blocks: approvedHRreturn(body.user, reward, constants.REWARD),
            attachments: approvedAttachment(constants.APPROVED_HR_Return)
        });
    },

    approvedActionByUser: async ({
        action, ack, body, client, respond
    }) => {
        await ack();

        switch (action.value) {
            case constants.YES:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: 'Your action must be approved by HR. You\'ll receive a notification about it!' }],
                    replace_original: true
                });

                const actionName = body.original_message.text.split('.').shift();

                const chosenAction = await actionService.findAction({ value: actionName });

                await client.chat.postMessage({
                    channel: `${HR2}`,
                    blocks: approvedHRBlock(body.user, chosenAction, constants.ACTION),
                    attachments: approvedAttachment(constants.APPROVED_HR_ACTION)
                });

                break;

            case constants.NO:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: 'You can choose another action from the list.' }],
                    replace_original: true
                });

                break;
        }
    },

    approvedRewardByUser: async ({
        action, ack, body, client, respond
    }) => {
        await ack();

        switch (action.value) {
            case constants.YES:
                const rewardName = body.original_message.text.split('.').shift();

                const [
                    reward,
                    ifEnoughRocks
                ] = await checkUserRocks(rewardName, body.user.id);

                if (!ifEnoughRocks) {
                    await respond({
                        text: body.original_message.text,
                        attachments: [{ text: 'Sorry, you don\'t have enough rocks for this reward.' }],
                        replace_original: true
                    });

                    return;
                }

                const { rocks } = await userService.updateOne({ id: body.user.id }, {
                    $push: { rewards: reward },
                    $inc: { rocks: -reward.rocks }
                });

                await respond({
                    text: `You chose this reward: ${rewardName}\nYour current balance: ${rocks} rocks`,
                    replace_original: true
                });

                await client.chat.postMessage({
                    channel: `${HR2}`,
                    text: `<@${body.user.id}> chose this reward: ${rewardName}\n User's balance: ${rocks} rocks`

                });

                break;

            case constants.NO:
                await respond({
                    text: body.original_message.text,
                    attachments: [{ text: 'You can choose another reward from the store.' }],
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
                    attachments: [{ text: `<@${body.user.id}> approved request.` }],
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
                    attachments: [{ text: `<@${body.user.id}> rejected request.` }],
                    replace_original: true
                });

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: `Your request was not approved. Please, contact with <@${body.user.id}> for more details.`,
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
                    attachments: [{ text: `<@${body.user.id}> approved return.` }],
                    replace_original: true
                });

                const [
                    reward,
                    rocks
                ] = await filteredStore(userValue, actionValue);

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: `HR approved your return a reward: ${reward.value}\nCurrent balance: ${rocks}`,
                });

                break;

            case constants.NO:
                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> rejected return.` }],
                    replace_original: true
                });

                await client.chat.postMessage({
                    channel: `${id}`,
                    text: `Your return was not approved. Please, contact with <@${body.user.id}> for more details.`,
                });

                break;
        }
    },

    selectCommand: async ({
        action, ack, body, client, say
    }) => {
        await ack();

        switch (action.selected_option.value) {
            case constants.GET_REWARDS: {
                const selectAttachments = await selectMenu(constants.REWARD, 'select_store');

                await say({
                    blocks: selectAttachments
                });
                break;
            }
            case constants.GET_ACTIONS:
                const selectAttachments = await selectMenu(constants.ACTION, 'select_action');

                await say({
                    blocks: selectAttachments
                });
                break;

            case constants.BALANCE:
                const { rocks } = await userService.findUser({ id: body.user.id });

                await say({
                    text: `You have ${rocks} rocks`
                });

                break;

            case constants.RETURN_REWARD:
                await returnRewardHelper(body.user.id, say);

                break;

            case constants.ADD_REWARD: {
                await createRewardHelper(body.user.id, body, client, say);

                break;
            }
            case constants.ADD_ACTION: {
                await createActionHelper(body.user.id, say, body, client);

                break;
            }
            case constants.KARMA:
                await karmaListenerHelper(body.user.id, say, client, body);

                break;
            case constants.CHANGE_BALANCE:
                await changeBalanceHelper(body.user.id, body, client, say);

                break;
            case constants.USER_BALANCE:
                await getUserBalanceHelper(body.user.id, say);

                break;

            case constants.EDIT_ACTION:
                await say('dffdg');

                break;
        }
    },

    approvedKarma: async ({
        ack, action, body, client, respond
    }) => {
        await ack();

        const block = body.original_message.blocks;

        const [
            userId,
            karmaUserId,
            rocksValue
        ] = body.original_message.text.split(',');

        switch (action.value) {
            case constants.YES:
                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> approved karma.` }],
                    replace_original: true
                });

                const user = await karmaProgramHelper(userId, karmaUserId, rocksValue);

                await client.chat.postMessage({
                    channel: `${userId}`,
                    text: 'Your karma program was approved by HR!'
                });

                await client.chat.postMessage({
                    channel: `${CHANNEL_GENERAL_ID}`,
                    blocks: karmaGeneralMessage(user, rocksValue, userId)
                });

                break;

            case constants.NO:
                await respond({
                    blocks: block,
                    attachments: [{ text: `<@${body.user.id}> rejected karma.` }],
                    replace_original: true
                });

                await client.chat.postMessage({
                    channel: `${userId}`,
                    text: `Your request karma program was not approved. Please, contact with <@${body.user.id}> for more details.`
                });
                break;
        }
    },

    getUserBalance: async ({
        ack, action, respond
    }) => {
        await ack();

        const id = action.selected_conversation;

        const { rocks } = await userService.findUser({ id });

        await respond({
            text: `User has ${rocks} rocks`,
            replace_original: true
        });
    },

    editAction: async ({
        ack, action, client, body
    }) => {
        await ack();

        const selectValue = action.selected_option.value;

        const chosenAction = await actionService.findAction({ value: selectValue });

        await client.views.open({
            trigger_id: body.trigger_id,
            view: editActionModal(constants.ACTION, constants.EDIT_ACTION, chosenAction)
        });
    },

};
