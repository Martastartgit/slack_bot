module.exports = (text, roxy) => {
    const [{ type, value: textValue }] = Object.values(text);
    const [{ type: typeRoxy, value: roxyValue }] = Object.values(roxy);

    return {
        textValue,
        roxyValue
    };

}
