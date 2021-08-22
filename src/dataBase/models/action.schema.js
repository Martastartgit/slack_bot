const { Schema, model } = require('mongoose');

const { dataTableName: { ACTION } } = require('../../constants');

const ActionScheme = new Schema({
    value: {
        type: String,
        minlength: 4,
        maxlength: 100
    },
    rocks: {
        type: Number,
        min: 1,
        max: 999
    }

});
module.exports = model(ACTION, ActionScheme);
