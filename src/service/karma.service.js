const { Karma } = require('../dataBase/models');
const { karmaRepository } = require('../dataBase/repository');

module.exports = {
    createKarma: (karmaObject) => Karma.create(karmaObject),

    // findUserKarma: (filterObject) => karmaRepository.karmaUser(filterObject),

    findUserKarma: (filterObject) => Karma.findOne(filterObject),

    updateKarmaUser: (filterObject, updateObject) => Karma.findOneAndUpdate(filterObject, updateObject, { new: true }),

};
