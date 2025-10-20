const displayStatus = (status) => {
    if (status === "available") {
        return <p className="text-green-600/70 font-bold text-sm lg:text-lg">
            موجود
        </p>
    } else if (status === "notAvailable") {
        return <p className="text-red-600/70 font-bold text-sm lg:text-lg">
            ناموجود
        </p>
    } else {
        return <p className="text-yellow-600/70 font-bold text-sm lg:text-lg">
            به زودی
        </p>
    }
};

export default displayStatus
