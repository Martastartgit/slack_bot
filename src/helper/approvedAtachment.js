module.exports = [{
    text: "Do you want to approve?",
    fallback: "You are unable to approve",
    color: "#3AA3E3",
    callback_id: "approved_actions",
    attachment_type: "default",
    actions: [
        {
            name: "yes",
            text: "yes",
            type: "button",
            value: "yes"
        },
        {
            name: "no",
            text: "no",
            type: "button",
            value: "no"
        }

    ]
}]
