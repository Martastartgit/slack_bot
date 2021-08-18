const { selectReturnReward } = require('../layouts');
const { userService } = require('../service');

module.exports = async (id, say) => {
    const userRewards = await userService.findUserRewards({ id });

    if (!userRewards.length) {
        await say('You haven\'t got any rewards yet!');

        return;
    }

    await say({
        text: 'Select what reward do you want to return.',
        attachments: selectReturnReward(userRewards)
    });
};
