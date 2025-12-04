import { Badge } from "@/components/ui/badge";

const productDetailBadge = (used) => {
    if (used === true) {
        return (
            <Badge
                variant="destructive"
                className="absolute max-md:-top-8 lg:-top-8 max-md:left-2 lg:-left-2 text-xs lg:text-sm"
            >
                کارکرده
            </Badge>
        )
    } else {
        return (
            <Badge
                variant="default"
                className="absolute max-md:-top-8 lg:-top-8 max-md:left-2 lg:-left-2 text-xs lg:text-sm"
            >
                آکبند
            </Badge>
        )
    }
};

export default productDetailBadge