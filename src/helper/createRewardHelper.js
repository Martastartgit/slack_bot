const { constants } = require('../constants');
const checkAccess = require('./checkAccess');
const { viewCreate } = require('../layouts');

module.exports = async (id, body, client, say) => {
    const ifAccessDeny = checkAccess(id);

    if (ifAccessDeny) {
        await say('Access deny!');

        return;
    }

    const viewStore = viewCreate(constants.REWARD, 'view_2');

    await client.views.open({
        trigger_id: body.trigger_id,
        view: viewStore
    });
};
