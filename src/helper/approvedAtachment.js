module.exports = (callback, text)=> [{
    text: `${text}`,
    fallback: "You are unable to approve",
    color: "#3AA3E3",
    callback_id: `approved${callback}`,
    attachment_type: "default",
    actions: [
        {
            name: "yes",
            text: "Approve",
            type: "button",
            value: "yes"
        },
        {
            name: "no",
            text: "Cancel",
            type: "button",
            value: "no"
        }

    ]
}]
