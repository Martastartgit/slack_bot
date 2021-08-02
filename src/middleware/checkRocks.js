const { userService: { user_service }, storeService: { store_service }} = require('../service');

module.exports = async (rewardName, id) => {
    const reward = await store_service.findOneStore({value: rewardName});

    const user = await user_service.findUser({id});

    return [
        reward,
        user.rocks >= reward.rocks
    ]

}
