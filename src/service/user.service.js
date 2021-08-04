const { User } = require('../dataBase/models');
const { userRepository } = require('../dataBase/repository');

module.exports = {
    createUser: (userObject) => User.create(userObject),

    findUser: (filterObject) => User.findOne(filterObject),

    updateOne: (filterObject, updateObject) => User.findOneAndUpdate(filterObject, updateObject, { new: true }),

    findUserRewards: (filterObject) => userRepository.userRewards(filterObject)

};
