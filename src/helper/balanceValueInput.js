const { constants } = require('../constants');

module.exports = (text, rocks) => {
    let user;
    let rocksValue;
    const [{ type, selected_conversation: item }] = Object.values(text);
    const [{ type: typeRoxy, value: itemRocks }] = Object.values(rocks);

    user = item;
    rocksValue = itemRocks;

    return {
        user, 
        rocksValue
    };
};