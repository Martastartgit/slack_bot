const { attachments_helper, homeView } = require('../helper');

module.exports = {
    appMention: async ({ event, say }) => {
        try {
            await say({
                text: `Hey <@${event.user}> you mentioned me`,
                attachments: attachments_helper
            });
        } catch (e) {
            console.log(e);
        }
    },

    appHomeOpened: async ({ event, client }) => {
        try {
            await client.views.publish({
                user_id: event.user,
                view: homeView
            });
        } catch (e) {
            console.error(e);
        }
    }
};
