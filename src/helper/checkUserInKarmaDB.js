const { karmaService } = require('../service');

module.exports = async (id) => {
    const userWithKarma = await karmaService.findUserKarma({ userId: id });

    // const userWithKarma = await karmaService.findUserKarma({ id });

    if (!userWithKarma) {
        await karmaService.createKarma({ userId: id });

        return;
    }

    return userWithKarma;
};
