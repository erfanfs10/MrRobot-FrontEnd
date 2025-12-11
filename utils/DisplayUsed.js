import { Badge } from "@/components/ui/badge"

const displayUsed = (used) => {
    if (used === true) {
        return (
            <Badge
                variant="destructive"
                className="text-xs lg:text-sm"
            >
                کارکرده
            </Badge>
        )
    } else {
        return (
            <Badge
                variant="default"
                className="text-xs lg:text-sm"
            >
                آکبند
            </Badge>
        )
    }
 
}

export default displayUsed
