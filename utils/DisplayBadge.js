import { Badge } from "@/components/ui/badge";

const displayBadge = (used) => {
    if (used === true) {
        return (
            <Badge
                variant="destructive"
                className="absolute max-md:top-2 lg:-top-2 max-md:left-2 lg:-right-2 text-xs lg:text-sm"
            >
                کارکرده
            </Badge>
        )
    } else {
        return (
            <Badge
                variant="default"
                className="absolute max-md:top-2 lg:-top-2 max-md:left-2 lg:-right-2 text-xs lg:text-sm"
            >
                آکبند
            </Badge>
        )
    }
};

export default displayBadge