import { RefetchButton } from "@/_shared/atoms/refetch-button";
import { useAuditLog } from "../al.context";

export function AuditLogController(){
    const {isFetching, refetch} = useAuditLog()
    return <div>
        <RefetchButton isFetching={isFetching} onRefetch={refetch} />
    </div>
}