const { constants } = require('../constants');

module.exports = (text, rocks, value) => {
    let textValue;
    let rocksValue;
    switch (value) {
        case constants.ACTION:
        case constants.REWARD: {
            const [{ type, value: item }] = Object.values(text);
            const [{ type: typeRoxy, value: itemRocks }] = Object.values(rocks);

            textValue = item;
            rocksValue = itemRocks;
            break;
        }
        case constants.KARMA: {
            const [{ type, selected_conversation: item }] = Object.values(text);
            const [{ type: typeRoxy, value: itemRocks }] = Object.values(rocks);

            textValue = item;
            rocksValue = itemRocks;
            break;
        }
    }

    return {
        textValue,
        rocksValue
    };
};
