const { karmaService } = require('../service');

module.exports = async (id) => {
    const userWithKarma = await karmaService.findUserKarma({ userId: id });

    if (!userWithKarma) {
        const user = await karmaService.createKarma({ userId: id });

        return user;
    }

    return userWithKarma;
};
