const {User} = require('../../dataBase/models')

module.exports ={
    createUser: (userObject) => User.create(userObject),

    findUser: (filterObject) => User.findOne(filterObject),

    updateOne: (filterObject, updateObject) => User.findOneAndUpdate(filterObject, updateObject,{ new: true }),

    findUserRewards: async (filterObject) =>{
        const userRewards = await User.findOne(filterObject)
            .populate('_store')
            .select({_store: 1, _id: 0})
        return userRewards._store

    }

}
