const { Schema, model } = require('mongoose');

const { dataTableName: { ACTION } } = require('../../constants');

const ActionScheme = new Schema({
    value: {
        type: String,
        minlength: 5,
        maxlength: 100
    },
    roxy: {
        type: Number,
        min: 1,
        max: 999
    }

});
module.exports = model(ACTION, ActionScheme);
