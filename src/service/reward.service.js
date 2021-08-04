const { Reward } = require('../dataBase/models');

module.exports = {
    createReward: (rewardObject) => Reward.create(rewardObject),

    getAllRewards: () => Reward.find(),

    findOneReward: (filterObject) => Reward.findOne(filterObject)

};
