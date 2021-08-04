const { Schema, model } = require('mongoose');

const { dataTableName: { ACTION, REWARD, USER } } = require('../../constants');

const UserScheme = new Schema({
    id: String,
    name: String,
    rocks: {
        type: Number,
        default: 10
    },
    actions: [{
        type: Schema.Types.ObjectId, ref: ACTION
    }],
    rewards: [{
        type: Schema.Types.ObjectId, ref: REWARD
    }]

});

module.exports = model(USER, UserScheme);
