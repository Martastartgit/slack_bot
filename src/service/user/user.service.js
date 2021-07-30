const {User} = require('../../dataBase/models')

module.exports ={
    createUser: (userObject) => User.create(userObject),

    findUser: (filterObject) => User.findOne(filterObject),

    updateOne: (filterObject, updateObject) => User.findOneAndUpdate(filterObject, updateObject,{ new: true } )

}
