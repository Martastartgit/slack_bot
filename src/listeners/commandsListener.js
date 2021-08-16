const {
    constants
} = require('../constants');
const { ADMINS } = require('../config/config');
const {
    overflowSection, viewCreate, selectMenu, selectReturnReward,
    checkUserInKarmaDB,
    karmaModalView
} = require('../helper');
const { userService } = require('../service');

module.exports = {
    addAction: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            const adminsId = ADMINS.split(';');

            if (!adminsId.includes(body.user_id)) {
                await say('Access deny!');

                return;
            }
            const viewAction = viewCreate(constants.ACTION, 'view_1');

            await client.views.open({
                trigger_id: body.trigger_id,
                view: viewAction
            });
        } catch (e) {
            console.error(e);
        }
    },

    addReward: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            const adminsId = ADMINS.split(';');

            if (!adminsId.includes(body.user_id)) {
                await say('Access deny!');

                return;
            }
            const viewStore = viewCreate(constants.REWARD, 'view_2');

            await client.views.open({
                trigger_id: body.trigger_id,
                view: viewStore
            });
        } catch (e) {
            console.error(e);
        }
    },

    getAllActions: async ({ ack, say }) => {
        try {
            await ack();

            const selectAttachments = await selectMenu(constants.ACTION, 'select_action');

            await say({
                text: 'Hey pick action!',
                attachments: selectAttachments
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
                text: 'Hey pick reward!',
                attachments: selectAttachments
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

            const userRewards = await userService.findUserRewards({ id: body.user_id });

            if (!userRewards.length) {
                await say('You haven\'t got any rewards yet!');

                return;
            }

            await say({
                text: 'Select what reward do you want to return.',
                attachments: selectReturnReward(userRewards)
            });
        } catch (e) {
            console.error(e);
        }
    },

    karma: async ({
        ack, body, say, client
    }) => {
        try {
            await ack();

            const { _id } = await userService.findUser({ id: body.user_id });

            // const karmaUser = await checkUserInKarmaDB(body.user_id);

            const karmaUser = await checkUserInKarmaDB(_id);

            if (karmaUser.rocks === 0) {
                await say('Sorry, you spent all your karma rocks!');

                return;
            }

            await client.views.open({
                trigger_id: body.trigger_id,
                view: karmaModalView(karmaUser.rocks)
            });
        } catch (e) {
            console.error(e);
        }
    }

};
