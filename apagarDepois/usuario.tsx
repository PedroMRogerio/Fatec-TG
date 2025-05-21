import { useEffect } from "react";
import { useAuthUid } from "@/components/firestore-query/auth-uid";

export default function Usuario() {
    const uid = useAuthUid();

    useEffect(() => {
        if (uid) {
            console.log('UID:', uid);
        }
    }, [uid]);

    return <></>;

}