const { Schema, model } = require('mongoose');

const { dataTableName: { KARMA, USER } } = require('../../constants');

const KarmaSubModel = {
    userId: String,
    rocks: Number
};

const KarmaScheme = new Schema({
    rocks: {
        type: Number,
        default: 20
    },
    userId: {
        type: Schema.Types.ObjectId, ref: USER
    },
    karma: [KarmaSubModel]

});

module.exports = model(KARMA, KarmaScheme);
