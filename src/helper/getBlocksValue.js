module.exports = (blocks) => {
    const test = [];

    blocks.map(({ fields }) => fields && fields.map(({ text }) => {
        const value = text.split('\n');
        return test.push(value);
    }));

    const [
        user,
        actions
    ] = test;

    const userValue = user.pop();
    const actionValue = actions.pop();

    return [
        userValue.trim(),
        actionValue.trim()
    ];
};
