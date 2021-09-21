const { constants } = require('../constants');

module.exports = (text, shortText, rocks, value) => {
    let textValue;
    let rocksValue;
    let shortValue;
    switch (value) {
        case constants.ACTION:
        case constants.REWARD: {
            const [{ type: typeText, value: item }] = Object.values(text);
            const [{ type: typeDesc, value: shortItem }] = Object.values(shortText);
            const [{ type: typeRoxy, value: itemRocks }] = Object.values(rocks);

            textValue = item;
            shortValue = shortItem;
            rocksValue = itemRocks;
            break;
        }
    }

    return {
        textValue,
        rocksValue,
        shortValue
      
    };
};
