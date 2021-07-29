const { actionService: { action_service } } = require('../service');

const createOptions = async () => {
    const actions = await action_service.getAllListOfActions();

    return actions.map((item) => ({
        type: "plain_text",
        text: `${item.value}`,
        value: `${item.value}`
    }))
}

module.exports = async () => {
    const allOptions = await createOptions();
    return [{
        text: "Select action",
        fallback: "If you could read this message, you’d be choosing something fun to do right now",
        color: "#3AA3E3",
        callback_id: "selection",
        attachment_type: "default",
        actions: [{
            name: "list",
            text: "Pick item",
            type: "select",
            options: allOptions
        }]
    }]
}
