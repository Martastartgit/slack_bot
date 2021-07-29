const { dataTableName } = require('../constants');
const { actionService: { action_service }, storeService: { store_service } } = require('../service');

const createOptions = async (text) => {
    let options;

    switch (text) {
        case dataTableName.ACTION:
            options = await action_service.getAllListOfActions();
            break;
        case dataTableName.STORE:
            options = await store_service.getAllList();
            break;
    }

    return options.map((item) => ({
        type: "plain_text",
        text: `${item.value}`,
        value: `${item.value}`
    }))

}

module.exports = async (text, callback) => {
    const allOptions = await createOptions(text);

    return [{
        text: `Select ${text}`,
        fallback: "If you could read this message, you’d be choosing something fun to do right now",
        color: "#3AA3E3",
        callback_id: `${callback}`,
        attachment_type: "default",
        actions: [{
            name: "list",
            text: "Pick item",
            type: "select",
            options: allOptions
        }]
    }]
}
