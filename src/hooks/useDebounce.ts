import { useEffect } from "react";

export default function useDebounce(callback: () => void, deps: unknown[] = [], timeout: number = 350) {
    useEffect(() => {

        const handler = setTimeout(() => {
            callback()
        }, timeout);

        return () => {
            clearTimeout(handler)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeout, callback, ...deps])
}