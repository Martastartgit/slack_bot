const { constants } = require('../constants');
const checkAccess = require('./checkAccess');
const { viewCreate } = require('../layouts');

module.exports = async (id, say, body, client) => {
    const ifAccessDeny = checkAccess(id);

    if (ifAccessDeny) {
        await say('Access deny!');

        return;
    }
    const viewAction = viewCreate(constants.ACTION, 'view_1');

    await client.views.open({
        trigger_id: body.trigger_id,
        view: viewAction
    });
};
