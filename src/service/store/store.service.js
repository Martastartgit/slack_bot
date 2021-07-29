const {Store} = require('../../dataBase/models')

module.exports ={
    createStore: (storeObject) => Store.create(storeObject),

    getAllList: () => Store.find(),

    findOneStore: (filterObject) => Store.findOne(filterObject)

}
