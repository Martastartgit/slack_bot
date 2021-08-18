module.exports = (text) => /^[0-9a-zA-Zа-яА-ЯЇїІі]+$/.test(text.split(' ').join(''));
