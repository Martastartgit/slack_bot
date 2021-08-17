const { Karma } = require('../dataBase/models');

module.exports = {
    createKarma: (karmaObject) => Karma.create(karmaObject),

    findUserKarma: (filterObject) => Karma.findOne(filterObject),

    updateKarmaUser: (filterObject, updateObject) => Karma.findOneAndUpdate(filterObject, updateObject, { new: true }),

};
