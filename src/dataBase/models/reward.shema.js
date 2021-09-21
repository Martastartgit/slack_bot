const { Schema, model } = require('mongoose');

const { dataTableName: { REWARD } } = require('../../constants');

const RewardScheme = new Schema({
    id: String,
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
module.exports = model(REWARD, RewardScheme);
