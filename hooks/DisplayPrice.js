const displayPrice = (netPrice) => {
    return Number(String(netPrice).split(".")[0]).toLocaleString("fa-IR");
};

export default displayPrice