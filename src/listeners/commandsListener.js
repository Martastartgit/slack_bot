const { constants } = require('../constants');
const {
    changeBalanceHelper,
    createActionHelper,
    createRewardHelper,
    editActionHelper,
    getUserBalanceHelper,
    karmaListenerHelper,
    returnRewardHelper
} = require('../helper');
const {
    overflowSection,
    selectMenu,
} = require('../layouts');
const { userService } = require('../service');

module.exports = {
    addAction: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            await createActionHelper(body.user_id, say, body, client);
        } catch (e) {
            console.error(e);
        }
    },

    addReward: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            await createRewardHelper(body.user_id, body, client, say);
        } catch (e) {
            console.error(e);
        }
    },

    getAllActions: async ({ ack, say }) => {
        try {
            await ack();

            const selectAttachments = await selectMenu(constants.ACTION, 'select_action');

            await say({
                blocks: selectAttachments
            });
        } catch (e) {
            console.error(e);
        }
    },

    getAllRewards: async ({ ack, say }) => {
        try {
            await ack();

            const selectAttachments = await selectMenu(constants.REWARD, 'select_store');

            await say({
                blocks: selectAttachments
            });
        } catch (e) {
            console.error(e);
        }
    },

    botMenu: async ({ ack, say }) => {
        try {
            await ack();

            await say({
                blocks: overflowSection
            });
        } catch (e) {
            console.error(e);
        }
    },

    userBalance: async ({ ack, body, say }) => {
        try {
            await ack();

            const { rocks } = await userService.findUser({ id: body.user_id });

            await say({
                text: `You have ${rocks} rocks.`
            });
        } catch (e) {
            console.error(e);
        }
    },

    returnReward: async ({
        ack, body, say
    }) => {
        try {
            await ack();

            await returnRewardHelper(body.user_id, say);
        } catch (e) {
            console.error(e);
        }
    },

    karma: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            await karmaListenerHelper(body.user_id, say, client, body);
        } catch (e) {
            console.error(e);
        }
    },

    changedUsersBalance: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            await changeBalanceHelper(body.user_id, body, client, say);
        } catch (e) {
            console.error(e);
        }
    },

    getUserBalance: async ({
        ack, body, say
    }) => {
        try {
            await ack();

            await getUserBalanceHelper(body.user_id, say);
        } catch (e) {
            console.error(e);
        }
    },

    editAction: async ({
        ack, body, say
    }) => {
        try {
            await ack();

            await editActionHelper(body.user_id, say);
        } catch (e) {
            console.error(e);
        }
    },

};
