const checkAccess = require('./checkAccess');
const { changeUserBalanceModal } = require('../layouts');

module.exports = async (id, body, client, say) => {
    const ifAccessDeny = checkAccess(id);

    if (ifAccessDeny) {
        await say('Access deny!');

        return;
    }

    await client.views.open({
        trigger_id: body.trigger_id,
        view: changeUserBalanceModal
    });
};
