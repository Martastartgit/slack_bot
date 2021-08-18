const { Karma } = require('../dataBase/models');

module.exports = () => {
    const now = new Date();
    const sixMonthAgo = now.setDate(now.getDate() - 6);

    Karma.updateMany({
        createdAt: {
            $lte: sixMonthAgo
        }
    }, { $set: { rocks: 20 } });
};
