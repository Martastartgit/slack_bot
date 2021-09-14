module.exports = (str) => {
    const letterCount = str.replace(/\s+/g, '').length;
    const spaceCount = str.split(' ').length - 1;
    return spaceCount + letterCount;
};
