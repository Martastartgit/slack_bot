const { User } = require('../models');

module.exports = {
    userRewards: async (filterObject) => {
        const userRewards = await User.findOne(filterObject)
            .populate('rewards')
            .select({ rewards: 1, _id: 0 });
        return userRewards.rewards;
    }

};
