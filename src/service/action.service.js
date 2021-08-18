const { Action } = require('../dataBase/models');

module.exports = {
    createAction: (actionObject) => Action.create(actionObject),

    getAllListOfActions: () => Action.find(),

    findAction: (filterObject) => Action.findOne(filterObject),

    updateAction: (filterObject, updateObject) => Action.findOneAndUpdate(filterObject, updateObject, { new: true }),

};
