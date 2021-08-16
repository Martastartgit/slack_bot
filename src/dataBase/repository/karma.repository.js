const { Karma, User } = require('../models');
const { userService, karmaService } = require('../../service');

module.exports = {
    karmaUser: async (id) => {
        // const { _id } = await User.findOne(id);
        //
        // const userWithKarma = await Karma.findOne({ userId: _id });
        //
        // return userWithKarma;
        const { _id } = await userService.findUser(id);

        const userWithKarma = await karmaService.findUserKarma({ userId: _id });

        return userWithKarma;
    }

};
