const { userService } = require('../service');

module.exports = async (app) => {
    const result = await app.client.users.list({
        token: process.env.SLACK_BOT_TOKEN
    });

    return result.members.map(async ({ id, name, is_bot }) => {
        const userExist = await userService.findUser({ id });

        if (!userExist && is_bot === false && name !== 'slackbot') {
            await userService.createUser({ id, name });
        }
    });
};
