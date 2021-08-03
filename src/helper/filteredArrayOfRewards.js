const { userService: { user_service }, storeService: {store_service }} = require('../service')

module.exports = async (user, reward) => {
    const chosenReward = await store_service.findOneStore({value: reward});

    const allRewards = await user_service.findUserRewards({name: user});

    const index = allRewards.findIndex(({value}) => value === reward);

    let userRocks = 0;

    if (index !== -1) {
        allRewards.splice(index, 1);

        const {rocks} = await user_service.updateOne({name: user}, {_store: allRewards,
            $inc: { rocks: +chosenReward.rocks}});

        userRocks = rocks;
    }

    return [
        chosenReward,
        userRocks
    ]
}
