const { Schema, model } = require('mongoose');

const { dataTableName: { REWARD } } = require('../../constants');

const RewardScheme = new Schema({
    id: String,
    value: {
        type: String,
        minlength: 5,
        maxlength: 100
    },
    rocks: {
        type: Number,
        min: 1,
        max: 999
    }

});
module.exports = model(REWARD, RewardScheme);
