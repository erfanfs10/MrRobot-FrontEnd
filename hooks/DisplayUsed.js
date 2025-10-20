const displayUsed = (status, used) => {
    if (status === "av") {
        if (used) {
            return <p className="text-xs lg:text-base font-semibold text-yellow-600/70">
                کارکرده
            </p>
        } else {
            return <p className="text-xs lg:text-base font-semibold text-yellow-600/70">
                آکبند
            </p>
        }
    }
}

export default displayUsed
