const { constants } = require('../constants');
const checkAccess = require('./checkAccess');
const { staticSelectUser } = require('../layouts');

module.exports = async (id, say) => {
    const ifAccessDeny = checkAccess(id);

    if (ifAccessDeny) {
        await say('Access deny!');

        return;
    }

    const users = staticSelectUser(constants.GET_BALANCE);

    await say({
        text: 'Select user',
        blocks: [users]
    });
};
