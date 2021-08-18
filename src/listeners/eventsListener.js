const { attachments_helper } = require('../layouts');

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
    }

};
