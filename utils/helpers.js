const taxRate = 0.13

const couponCodes = ['BLACKFRIDAY', 'FREESHIP', 'HOHOHO']

function formatPrice(price) {
    // .. do some formatting
    return formattedPrice
}

function addTax(price) {
    return price * (1 + taxRate)
}

function discountPrice(price, percentage) {
    return price * (1 - percentage)
}

export { couponCodes, formatPrice, addTax, discountPrice }
