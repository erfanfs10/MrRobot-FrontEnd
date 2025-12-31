import { Badge } from "@/components/ui/badge";

const productListMobileBadge = (used) => {
    if (used === true) {
        return (
            <Badge
                variant="destructive"
                className="absolute top-2 lg:-top-2 left-2 lg:-left-2 text-xs lg:text-sm"
            >
                کارکرده
            </Badge>
        )
    } else {
        return (
            <Badge
                variant="default"
                className="absolute top-2 lg:-top-2 left-2 lg:-left-2 text-xs lg:text-sm"
            >
                آکبند
            </Badge>
        )
    }
};

export default productListMobileBadge