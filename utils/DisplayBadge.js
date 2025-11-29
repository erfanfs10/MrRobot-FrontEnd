import { Badge } from "@/components/ui/badge";

const displayBadge = (used) => {
    if (used === true) {
        return (
            <Badge
                variant="destructive"
                className="absolute top-2 right-2 text-xs lg:text-sm"
            >
                کارکرده
            </Badge>
        )
    } else {
        return (
            <Badge
                variant="default"
                className="absolute -top-2 -right-2 text-xs lg:text-sm"
            >
                آکبند
            </Badge>
        )
    }
};

export default displayBadge