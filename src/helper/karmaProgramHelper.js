const { userService, karmaService } = require('../service');

module.exports = async (userId, karmaUserId, rocksValue) => {
    const { _id } = await userService.findUser({ id: userId });

    await karmaService.updateKarmaUser({ userId: _id }, {
        $push: { karma: { userId: karmaUserId, rocks: rocksValue } },
        $inc: { rocks: -rocksValue }
    });

    const user = await userService.updateOne({ id: karmaUserId }, { $inc: { rocks: +rocksValue } });

    return user;
};
