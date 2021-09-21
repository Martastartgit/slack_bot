const { Schema, model } = require('mongoose');

const { dataTableName: { ACTION } } = require('../../constants');

const ActionScheme = new Schema({
    value: {
        type: String,
        minlength: 2
    },
    shortDescription: {
        type: String,
        minlength: 4,
        maxlength: 26
    },
    rocks: {
        type: Number,
        min: 1,
        max: 9999
    }

});
module.exports = model(ACTION, ActionScheme);
