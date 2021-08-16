const { Karma } = require('../dataBase/models');

module.exports = () => Karma.updateMany({}, { $set: { rocks: 20 } });
