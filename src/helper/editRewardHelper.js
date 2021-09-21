const checkAccess = require('./checkAccess');
const { constants } = require('../constants');
const { selectMenu } = require('../layouts');

module.exports = async (id, say) => {
    const ifAccessDeny = checkAccess(id);

    if (ifAccessDeny) {
        await say('Access deny!');

        return;
    }

    const selectAttachments = await selectMenu(constants.REWARD, 'edit_reward');

    await say({
        blocks: selectAttachments
    });
};