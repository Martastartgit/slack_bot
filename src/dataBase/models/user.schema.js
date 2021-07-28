const { Schema, model } = require('mongoose');

const { dataTableName: { USER, ACTION, STORE } } = require('../../constants');

const UserScheme = new Schema({
    id: String,
    name: String,
    roxy: {
        type: Number,
        default: 10
    },
    _action: [{
        type: Schema.Types.ObjectId, ref: ACTION
    }],
    _store: [{
        type: Schema.Types.ObjectId, ref: STORE
    }]

});
module.exports = model(USER, UserScheme);
