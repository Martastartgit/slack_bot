const { userService, rewardService } = require('../service');

module.exports = async (rewardName, id) => {
    const reward = await rewardService.findOneReward({ value: rewardName });

    const user = await userService.findUser({ id });

    return [
        reward,
        user.rocks >= reward.rocks
    ];
};
