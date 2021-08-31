const makeSeparatedPrice = (price) => String(price).split('').reverse().join('').match(/[0-9]{1,3}/g).join(' ').split('').reverse().join('');

export default makeSeparatedPrice;