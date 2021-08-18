const { ADMINS } = require('../config/config');

module.exports = (id) => {
    const adminsId = ADMINS.split(';');

    return !adminsId.includes(id);
};
