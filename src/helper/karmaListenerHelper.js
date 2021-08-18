const checkUserInKarmaDB = require('./checkUserInKarmaDB');
const { karmaModalView } = require('../layouts');
const { userService } = require('../service');

module.exports = async (id, say, client, body) => {
    const { _id } = await userService.findUser({ id });

    const karmaUser = await checkUserInKarmaDB(_id);

    if (karmaUser.rocks === 0) {
        await say('Sorry, you spent all your karma rocks!');

        return;
    }

    await client.views.open({
        trigger_id: body.trigger_id,
        view: karmaModalView(karmaUser.rocks)
    });
};
