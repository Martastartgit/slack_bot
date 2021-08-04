const { userService, rewardService } = require('../service');

module.exports = async (user, reward) => {
    const chosenReward = await rewardService.findOneReward({ value: reward });

    const allRewards = await userService.findUserRewards({ name: user });

    const index = allRewards.findIndex(({ value }) => value === reward);

    let userRocks = 0;

    if (index !== -1) {
        allRewards.splice(index, 1);

        const { rocks } = await userService.updateOne({ name: user }, {
            rewards: allRewards,
            $inc: { rocks: +chosenReward.rocks }
        });

        userRocks = rocks;
    }

    return [
        chosenReward,
        userRocks
    ];
};
