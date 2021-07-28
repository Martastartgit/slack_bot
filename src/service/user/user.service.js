const {User} = require('../../dataBase/models')

module.exports ={
    createUser: (userObject) => User.create(userObject),

    findUser: (filterObject) => User.findOne(filterObject),

    updateOne: (userId, userObject) => User.findByIdAndUpdate(userId, userObject, { new: true }),
}
