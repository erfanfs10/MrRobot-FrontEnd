const shippingCalc = (cartLength) => {
    if (cartLength <= 2) {
        return 200000;
    } if (cartLength <= 4) {
        return 400000;
    } else {
        return null;
    }
}

export default shippingCalc