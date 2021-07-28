const {Action} = require('../../dataBase/models')

module.exports ={
    createAction: (actionObject) => Action.create(actionObject),

    getAllListOfActions: () => Action.find()

}
